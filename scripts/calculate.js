const fs = require('fs');
const formulaVersion = '1.0.1';
const round = (value, digits = 2) => Number(Number(value).toFixed(digits));
function finish(payload, exitCode = 0) {
  console.log(JSON.stringify({ formula_version: formulaVersion, ...payload }, null, 2));
  process.exit(exitCode);
}
let input;
try {
  input = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
} catch (error) {
  finish({ status: 'invalid', errors: ['输入文件不是有效JSON'], assumptions: [], confirmations: [] }, 2);
}
if (!input || typeof input !== 'object' || Array.isArray(input)) {
  finish({ status: 'invalid', errors: ['顶层必须是JSON对象'], assumptions: [], confirmations: [] }, 2);
}
const errors = [];
const has = key => Object.prototype.hasOwnProperty.call(input, key);
function numberField(key, label, { required = true, min = 0, max = Number.MAX_SAFE_INTEGER } = {}) {
  if (!has(key) || input[key] === null || input[key] === '') {
    if (required) errors.push(`${label}缺失`);
    return null;
  }
  const value = Number(input[key]);
  if (!Number.isFinite(value)) errors.push(`${label}必须是有限数值`);
  if (value < min) errors.push(`${label}不得小于${min}`);
  if (value > max) errors.push(`${label}超出可处理范围`);
  return value;
}
const channels = Array.isArray(input.channels) ? input.channels : [];
if (channels.length > 0 && (has('channelMarketingCost') || has('marketingCost') || has('expectedLeads'))) {
  errors.push('渠道明细与顶层渠道营销费用/线索量不能同时填写，避免重复计费');
}
let channelMarketingCost;
let expectedLeads;
if (channels.length > 0) {
  channelMarketingCost = 0;
  expectedLeads = 0;
  channels.forEach((channel, index) => {
    const cost = Number(channel.marketingCost ?? channel.spend);
    const leads = Number(channel.expectedLeads ?? channel.leads);
    if (!Number.isFinite(cost) || cost < 0) errors.push(`渠道${index + 1}营销费用无效`);
    if (!Number.isFinite(leads) || leads < 0) errors.push(`渠道${index + 1}预计线索量无效`);
    channelMarketingCost += Number.isFinite(cost) && cost >= 0 ? cost : 0;
    expectedLeads += Number.isFinite(leads) && leads >= 0 ? leads : 0;
  });
} else {
  channelMarketingCost = numberField('channelMarketingCost', '渠道营销费用');
  expectedLeads = numberField('expectedLeads', '预计线索量');
}
const personnelCost = numberField('personnelCost', '人员成本');
const activityFixedCost = numberField('activityFixedCost', '活动固定成本');
const averageTuition = numberField('averageTuition', '平均客单价');
const variableCostPerEnrollment = numberField('variableCostPerEnrollment', '单个报名可变成本');
const rateUnit = input.rate_unit || 'decimal';
if (!['decimal', 'percent'].includes(rateUnit)) errors.push('rate_unit只能是decimal或percent');
function rateField(key, label) {
  const raw = numberField(key, label, { min: 0, max: rateUnit === 'percent' ? 100 : 1 });
  if (raw === null) return null;
  return rateUnit === 'percent' ? raw / 100 : raw;
}
const visitRate = rateField('visitRate', '到访率');
const closeRate = rateField('closeRate', '成交率');
if (errors.length > 0) {
  finish({ status: 'invalid', errors: [...new Set(errors)], assumptions: [], confirmations: [] }, 2);
}
const visits = expectedLeads * visitRate;
const enrollments = visits * closeRate;
const revenue = enrollments * averageTuition;
const variableCost = enrollments * variableCostPerEnrollment;
const fixedInvestment = channelMarketingCost + personnelCost + activityFixedCost;
const totalInvestment = fixedInvestment + variableCost;
const netBenefit = revenue - totalInvestment;
const acquisitionCost = channelMarketingCost > 0 && enrollments > 0 ? channelMarketingCost / enrollments : null;
const totalCostPerEnrollment = totalInvestment > 0 && enrollments > 0 ? totalInvestment / enrollments : null;
const contributionPerEnrollment = averageTuition - variableCostPerEnrollment;
const breakEvenAchievable = contributionPerEnrollment > 0;
const breakEvenEnrollments = breakEvenAchievable ? Math.ceil(fixedInvestment / contributionPerEnrollment) : null;
const cumulativeConversionRate = visitRate * closeRate;
const breakEvenLeads = breakEvenAchievable && cumulativeConversionRate > 0
  ? Math.ceil(breakEvenEnrollments / cumulativeConversionRate)
  : null;
const sensitivityFactors = [-0.2, -0.1, 0, 0.1, 0.2];
const sensitivity = sensitivityFactors.map(factor => {
  const adjustedVisitRate = Math.max(0, visitRate * (1 + factor));
  const adjustedCloseRate = Math.max(0, closeRate * (1 + factor));
  const adjustedEnrollments = expectedLeads * adjustedVisitRate * adjustedCloseRate;
  const adjustedRevenue = adjustedEnrollments * averageTuition;
  const adjustedVariableCost = adjustedEnrollments * variableCostPerEnrollment;
  return {
    change_rate: factor,
    visit_rate: round(adjustedVisitRate, 6),
    close_rate: round(adjustedCloseRate, 6),
    enrollments: round(adjustedEnrollments),
    revenue: round(adjustedRevenue),
    net_benefit: round(adjustedRevenue - adjustedVariableCost - fixedInvestment)
  };
});
const warnings = [];
if (contributionPerEnrollment <= 0) warnings.push('单个报名贡献毛利小于或等于零，无法形成有效盈亏平衡报名数');
if (cumulativeConversionRate <= 0) warnings.push('到访率或成交率为零，无法形成有效盈亏平衡线索数');
if (channelMarketingCost === 0) warnings.push('渠道营销费用为零，获客成本不可解释为真实投放效率');
if (enrollments === 0) warnings.push('预计报名人数为零，单个报名成本为空');
finish({
  status: 'ok',
  projections: {
    expected_leads: round(expectedLeads),
    expected_visits: round(visits),
    expected_enrollments: round(enrollments),
    expected_revenue: round(revenue)
  },
  cost_breakdown: {
    channel_marketing_cost: round(channelMarketingCost),
    personnel_cost: round(personnelCost),
    activity_fixed_cost: round(activityFixedCost),
    fixed_investment: round(fixedInvestment),
    variable_cost_per_enrollment: round(variableCostPerEnrollment),
    total_variable_cost: round(variableCost),
    total_investment: round(totalInvestment),
    cost_guard: '渠道营销费用、人员成本、活动固定成本只计入固定投入；单人可变成本按预计报名人数计入'
  },
  economics: {
    customer_acquisition_cost: acquisitionCost === null ? null : round(acquisitionCost),
    cost_per_enrollment: totalCostPerEnrollment === null ? null : round(totalCostPerEnrollment),
    contribution_margin_per_enrollment: round(contributionPerEnrollment),
    net_benefit: round(netBenefit)
  },
  break_even: {
    achievable: breakEvenAchievable,
    enrollments: breakEvenEnrollments,
    leads: breakEvenLeads,
    reason: breakEvenAchievable
      ? (cumulativeConversionRate > 0 ? null : '报名盈亏平衡数可计算，但转化为零，无法反推可实现线索数')
      : '单个报名贡献毛利小于或等于零'
  },
  assumptions: [
    `到访率按${rateUnit === 'percent' ? '百分数并已归一化' : '小数口径'}处理`,
    '预计线索量、到访率和成交率为同一时间窗口与同一客群口径',
    '渠道营销费用只计算一次，不重复计入活动固定成本'
  ],
  confirmations: [
    '确认渠道报价是否含税、是否包含返点和平台服务费',
    '确认人员成本是否仅覆盖本活动周期',
    '确认单个报名可变成本不包含已在固定投入中列示的项目'
  ],
  warnings,
  sensitivity
});

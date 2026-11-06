const fs = require('fs');
const input = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const fixedCost = Number(input.fixedCost || 0);
const channels = (input.channels || []).map(channel => {
  const spend = Number(channel.spend || 0);
  const leads = Number(channel.leads || 0);
  const enrollments = Number(channel.enrollments || 0);
  const revenue = Number(channel.revenue || 0);
  const variableCost = Number(channel.variableCost || 0);
  return {
    name: String(channel.name || '未命名渠道'),
    spend,
    leads,
    enrollments,
    revenue,
    cpl: leads ? Number((spend / leads).toFixed(2)) : null,
    costPerEnrollment: enrollments ? Number((spend / enrollments).toFixed(2)) : null,
    roas: spend ? Number((revenue / spend).toFixed(2)) : null,
    netProfit: Number((revenue - variableCost - spend).toFixed(2))
  };
});
const sum = key => channels.reduce((total, channel) => total + Number(channel[key] || 0), 0);
const totalSpend = sum('spend');
const totalEnrollments = sum('enrollments');
const totalRevenue = sum('revenue');
const totalVariableCost = (input.channels || []).reduce((total, channel) => total + Number(channel.variableCost || 0), 0);
console.log(JSON.stringify({
  status: 'ok',
  formula_version: '1.0.0',
  channels,
  totals: {
    spend: totalSpend,
    enrollments: totalEnrollments,
    revenue: totalRevenue,
    netProfit: Number((totalRevenue - totalVariableCost - totalSpend - fixedCost).toFixed(2)),
    overallCostPerEnrollment: totalEnrollments ? Number((totalSpend / totalEnrollments).toFixed(2)) : null
  }
}, null, 2));

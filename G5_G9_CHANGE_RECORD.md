# G5/G9 产品修改记录

- 产品编号：$(@{number=12; product_id=JLZ-EDU-SK-012; chinese_name=招生预算测算; english_name=Enrollment Budget Calculator; repository_name=edu-enrollment-budget-calculator; repository_url=https://github.com/jinlize-tech/edu-enrollment-budget-calculator; product_type=Skill; category_code=01; category=01 招生营销中心; description=招生预算、获客成本、转化成本和盈亏平衡测算。; target_users=System.Object[]; core_input=渠道报价、预计线索量、到访率、成交率、客单价、人员成本和活动固定成本; main_output=预算明细、获客成本、转化成本、盈亏平衡点、敏感性分析和假设表; product_risk=用未经验证的转化率制造确定性结论; dedup_label=无明显重复; dedup_note=与财务经营分析Agent相比只做招生预算和获客测算，不覆盖全校财务报表。; development_status=Planned / 待研发; license=Apache-2.0; spec_version=1.0.0; workbuddy_status=PLANNED_FOR_WORKBUDDY}.product_id)
- 产品名称：招生预算测算
- 基线：EDUCATION_BASELINE_V1.0.0
- 基线提交：$BaselineCommit
- 原版本：1.0.0
- 新版本：1.0.1

## 本次修改

1. 强化产品专属执行流程、输入核对和输出验收规则。
2. 新增 scripts/validate_input.js，实际检查必填字段、冲突、未确认数据和敏感信息。
3. 新增正常、缺失、冲突、敏感信息和非法JSON场景输入。
4. 测试升级为 T1–T7 分层并保存逐项检查结果。
5. 安装包加入 Apache-2.0 LICENSE 和 THIRD_PARTY_NOTICES.md。
6. 安装包升级为 1.0.1，加入许可证、第三方声明和输入校验脚本，保留 1.0.0 ZIP。
7. 按本产品冻结规格补充专属处理规则、输入到成果的核对矩阵和去重边界。

## 产品专属增强

- 核心任务：招生预算、获客成本、转化成本和盈亏平衡测算。
- 主要风险：用未经验证的转化率制造确定性结论
- 去重边界：与财务经营分析Agent相比只做招生预算和获客测算，不覆盖全校财务报表。

- 先锁定招生目标、课程、时间窗口、目标客群和可得预算，再讨论创意与渠道。
- 把假设线索量、转化率和单价分别列示，不以单一历史数据外推全部结果。
- 逐项检查渠道费用、人员投入、活动固定成本和单人可变成本，防止重复计费。
- 对宣传承诺、价格、名额、效果和第三方素材做合规与真实性复核。

## 运行边界

- 本地模型行为：NOT_RUNTIME_VERIFIED
- WorkBuddy平台验证：WORKBUDDY_VALIDATION_NOT_IN_SCOPE
- 本轮不执行上传、安装、审核或正式发布。

# G5/G9-R2 产品修改记录

- 产品编号：`JLZ-EDU-SK-012`
- 中文名称：`招生预算测算`
- 英文名称：`Enrollment Budget Calculator`
- 产品类型：`Skill`
- GitHub仓库：`https://github.com/jinlize-tech/edu-enrollment-budget-calculator`
- 1.0.0冻结基线：`EDUCATION_BASELINE_V1.0.0`
- 1.0.0基线Commit：`faebceecaa12496012eb0f8fdf6c5ec267968735`
- 1.0.1原版本Commit：`f8427422c30b78ef79b4a0a6cb8f08a233fdfdef`
- 1.0.2实施Commit：`cd45b8282950e12ff4574592c412e1317f0b24c3`
- 1.0.2最终证据Commit：`由 product-v1.0.2 Tag 指向的最新证据提交`
- 新版本：`1.0.2`

## 1.0.2 变更内容

1. 实际修改 `scripts/calculate.js`：敏感性分析增加 0 至 1 比率上下限和封顶/下限标识。
2. 非法到访率或成交率超过 100% 时明确报错，不静默修改用户原始输入。
3. 新增正向封顶、零值下浮、非法超限、正常和负向敏感性数值测试。
4. 补充 `BASELINE_VERSION.md` 当前 main 身份信息。
5. 重新生成 1.0.2 ZIP、清单、测试证据和 SHA-256。

## 实际修改文件

- `BASELINE_VERSION.md`
- `CHANGELOG.md`
- `dist/edu-enrollment-budget-calculator-v1.0.2.zip`
- `G5_G9_CHANGE_RECORD.md`
- `G5_G9_R2_ACCEPTANCE.md`
- `package-manifest.json`
- `product_meta.json`
- `README.md`
- `scripts/calculate.js`
- `SKILL.md`
- `test-results/v1.0.2.json`
- `tests/calculator-cases.json`
- `tests/calculator-cases/boundary-rates.json`
- `tests/calculator-cases/close-rate-0-down-20.json`
- `tests/calculator-cases/close-rate-100-up-20.json`
- `tests/calculator-cases/close-rate-above-100.json`
- `tests/calculator-cases/extreme-leads.json`
- `tests/calculator-cases/missing-variable-cost.json`
- `tests/calculator-cases/negative-leads.json`
- `tests/calculator-cases/negative-sensitivity.json`
- `tests/calculator-cases/nonpositive-contribution.json`
- `tests/calculator-cases/normal-sensitivity.json`
- `tests/calculator-cases/normal.json`
- `tests/calculator-cases/percent-input.json`
- `tests/calculator-cases/visit-rate-0-down-20.json`
- `tests/calculator-cases/visit-rate-100-up-20.json`
- `tests/calculator-cases/visit-rate-above-100.json`
- `tests/calculator-cases/zero-fixed-cost.json`
- `tests/calculator-cases/zero-rates.json`
- `test-results/TEST_REPORT-v1.0.2.md`
- `tests/validate_package.ps1`
- `VERSION`

## 测试项目与结果

- 总测试状态：`G9_R2_PRE_RELEASE_ACCEPTED`

| 测试层 | 结果 |
|---|---|
| T1_FILE_STRUCTURE | PASS |
| T2_METADATA_CONTRACT | PASS |
| T3_PRODUCT_CONTRACT | PASS |
| T4_DETERMINISTIC_FUNCTION | PASS |
| T5_SCENARIO_TESTS | PASS |
| T6_SECURITY | PASS |
| T7_PACKAGE_INTEGRITY | PASS |

## 安装包

- 路径：`dist/edu-enrollment-budget-calculator-v1.0.2.zip`
- SHA-256：`F4045B441AA62456C83C8C83DF2EB4EC649B664C1F72E88A8FECC6302E5E40E3`

## 运行边界

- 模型真实运行：`MODEL_RUNTIME_NOT_VERIFIED`
- WorkBuddy平台验证：`WORKBUDDY_VALIDATION_NOT_IN_SCOPE`
- 本轮不执行上传、安装、审核或正式发布。



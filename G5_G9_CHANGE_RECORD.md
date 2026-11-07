# G5/G9-R2 产品修改记录

- 产品编号：`JLZ-EDU-SK-012`
- 中文名称：`招生预算测算`
- 英文名称：`Enrollment Budget Calculator`
- 产品类型：`Skill`
- GitHub仓库：`https://github.com/jinlize-tech/edu-enrollment-budget-calculator`
- 1.0.0冻结基线：`EDUCATION_BASELINE_V1.0.0`
- 1.0.0基线Commit：`faebceecaa12496012eb0f8fdf6c5ec267968735`
- 1.0.1原版本Commit：`f8427422c30b78ef79b4a0a6cb8f08a233fdfdef`
- 1.0.2实施Commit：`PENDING_IMPLEMENTATION_COMMIT`
- 1.0.2最终证据Commit：`由 product-v1.0.2 Tag 指向的最新证据提交`
- 新版本：`1.0.2`

## 1.0.2 变更内容

1. 修复招生预算敏感性分析的 0 至 1 比率边界，超过 100% 时封顶并输出封顶标识，低于 0% 时下限为 0。
2. 拒绝到访率或成交率大于 100% 的原始输入，不对原始输入静默改写。
3. 增加正常、正向封顶、零值下浮、非法超限和负向敏感性测试。
4. 补充 BASELINE_VERSION.md 的产品身份信息，不修改历史冻结内容和基线 Tag。
5. 重新生成 1.0.2 安装包、package-manifest、测试证据和 SHA-256。

## 实际修改文件

- `VERIFICATION_PENDING`

## 测试项目与结果

- 总测试状态：`VERIFICATION_PENDING`

| 测试层 | 结果 |
|---|---|
| T1-T7 | VERIFICATION_PENDING |

## 安装包

- 路径：`dist/edu-enrollment-budget-calculator-v1.0.2.zip`
- SHA-256：`F4045B441AA62456C83C8C83DF2EB4EC649B664C1F72E88A8FECC6302E5E40E3`

## 运行边界

- 模型真实运行：`MODEL_RUNTIME_NOT_VERIFIED`
- WorkBuddy平台验证：`WORKBUDDY_VALIDATION_NOT_IN_SCOPE`
- 本轮不执行上传、安装、审核或正式发布。


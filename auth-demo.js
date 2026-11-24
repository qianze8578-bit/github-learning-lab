/**
 * auth-demo.js
 * 教学示例：模拟一次最小化的登录与受保护 API 请求。
 *
 * 注意：
 * - 这里只使用明确标注的模拟凭证，不连接真实服务。
 * - 示例中的 token 不是有效凭证，也不能用于任何真实 API。
 * - 生产环境不要把密码或长期令牌硬编码在源码中。
 */

const mockUser = {
  username: "demo-user",
  // 仅用于演示输入，不是真实密码。
  password: "NOT-A-REAL-PASSWORD",
};

function mockLogin(username, password) {
  if (username !== mockUser.username || password !== mockUser.password) {
    throw new Error("用户名或密码不正确（模拟验证）");
  }

  // 模拟服务端签发的访问令牌。
  return {
    accessToken: "MOCK_ACCESS_TOKEN_DO_NOT_USE",
    tokenType: "Bearer",
    expiresInSeconds: 900,
  };
}

function mockProtectedApiRequest(token) {
  if (token !== "MOCK_ACCESS_TOKEN_DO_NOT_USE") {
    return { status: 401, body: { error: "未授权：缺少或无效的访问令牌" } };
  }

  return {
    status: 200,
    body: { message: "认证成功，这是受保护的数据（模拟响应）" },
  };
}

function main() {
  console.log("1) 用户提交登录信息");
  const session = mockLogin(mockUser.username, mockUser.password);

  console.log("2) 模拟服务端返回令牌类型：", session.tokenType);
  console.log("3) 访问令牌有效期（秒）：", session.expiresInSeconds);

  // 不打印 token 本身，避免养成在日志中暴露凭证的习惯。
  const response = mockProtectedApiRequest(session.accessToken);
  console.log("4) 受保护 API 响应：", response);
}

main();

/**
 * token-demo.js
 * 教学示例：模拟 Access Token 过期，以及使用 Refresh Token 换取新令牌。
 *
 * 所有令牌均为虚构占位符，不是真实凭证。
 * 本示例不实现 JWT 签名、加密、持久化或真实 OAuth 请求。
 */

function issueMockTokenPair(version) {
  return {
    accessToken: `MOCK_ACCESS_TOKEN_V${version}_DO_NOT_USE`,
    refreshToken: `MOCK_REFRESH_TOKEN_V${version}_DO_NOT_USE`,
    accessTokenExpiresInSeconds: 900,
  };
}

function mockRefresh(refreshToken, currentVersion) {
  const expected = `MOCK_REFRESH_TOKEN_V${currentVersion}_DO_NOT_USE`;

  if (refreshToken !== expected) {
    throw new Error("刷新失败：模拟刷新令牌无效或已轮换");
  }

  // 模拟刷新令牌轮换：返回新的一对令牌。
  return issueMockTokenPair(currentVersion + 1);
}

function main() {
  console.log("1) 模拟登录后签发第一组令牌");
  const firstPair = issueMockTokenPair(1);
  console.log("访问令牌有效期：", firstPair.accessTokenExpiresInSeconds, "秒");

  console.log("2) 假设 Access Token 已经过期");
  console.log("3) 使用 Refresh Token 请求刷新（仅模拟）");
  const secondPair = mockRefresh(firstPair.refreshToken, 1);

  console.log("4) 刷新成功，已得到新的一组模拟令牌");
  console.log("5) 新访问令牌有效期：", secondPair.accessTokenExpiresInSeconds, "秒");

  // 不打印任何完整令牌值。
}

main();

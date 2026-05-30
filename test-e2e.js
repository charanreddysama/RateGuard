async function main() {
  const r = Math.random().toString(36).substring(7);
  const email = `test${r}@example.com`;
  
  // 1. Register
  const regRes = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Test User", email, password: "password123" })
  });
  const regData = await regRes.json();
  console.log("Registered:", regData);

  const loginRes = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: "password123" })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;

  // 2. Create Project
  const projRes = await fetch("http://localhost:5000/api/projects/create", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify({ name: "Test E2E Project" })
  });
  const projData = await projRes.json();
  console.log("Created Project:", projData);
  const projectId = projData._id;
  const apiKey = projData.apiKey;

  // 3. Create Rule
  const ruleRes = await fetch("http://localhost:5000/api/rules/create", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify({
      projectId,
      route: "/products",
      algorithm: "fixed_window",
      limit: 5,
      window: 60
    })
  });
  const ruleData = await ruleRes.json();
  console.log("Created Rule:", ruleData);
  console.log("API_KEY=" + apiKey);
}

main().catch(console.error);

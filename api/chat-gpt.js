const fetch = require("node-fetch");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { keywords } = req.body;

    // 프롬포트 생성 코드
    const prompt = `
    이 어린이는 ${keywords.join(", ")} 키워드를 가진 아이입니다. 
    산타할아버지의 말투로, 올 한 해의 수고를 인정하고, 다음 해를 축하하는 따뜻한 말을 작성해주세요. (400자이내)
    `;

    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 100,
          temperature: 0.7,
        }),
      });

      // OpenAI 응답 디버깅
      const data = await response.json();
      console.log("OpenAI API Response:", data); // 응답 로그 출력

      if (!data.choices || data.choices.length === 0) {
        throw new Error(
          "Invalid response from OpenAI API: choices array is empty or undefined"
        );
      }

      const message = data.choices[0].text.trim();
      res.status(200).json({ message });
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "Failed to fetch OpenAI API response." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

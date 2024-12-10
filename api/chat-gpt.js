const fetch = require("node-fetch");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { keywords } = req.body;

    // 프롬프트 생성
    const prompt = `
    이 어린이는 ${keywords.join(", ")} 키워드를 가진 아이입니다. 
    산타할아버지의 말투로, 올 한 해의 수고를 인정하고, 다음 해를 축하하는 따뜻한 말을 작성해 주세요. (300자 이내)
    `;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo", // 최신 모델로 변경
            messages: [
              { role: "system", content: "You are Santa Claus." },
              { role: "user", content: prompt },
            ],
            max_tokens: 100,
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();

      // OpenAI 응답 검증
      if (!data || !data.choices || data.choices.length === 0) {
        throw new Error("Invalid response from OpenAI API");
      }

      const message = data.choices[0].message.content.trim();
      res.status(200).json({ message });
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "Failed to fetch OpenAI API response." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

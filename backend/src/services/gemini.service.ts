import { GoogleGenerativeAI } from "@google/generative-ai";
import { getFileFromS3PresignedUrl } from "./awss3.service";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const DocumentSummaryPrompt =
  "Extract the key details from the attached resume and provide a concise summary (3-4 sentences). Include the candidate's name (if available), core skills, years of experience, educational background, and any notable achievements. Additionally, provide a brief comment on the overall strength of the resume, offering insights for recruiters (e.g., suitability for specific roles) and actionable feedback for the candidate (e.g., areas for improvement or potential career highlights). The summary should be tailored for a job recommendation platform.";
//TODO->seeing results with different and good prompts

export async function getDocumentSummary(key:string){
    try {
        const url = await getFileFromS3PresignedUrl(key);
        const pdfResp = await fetch(url).then((res) => res.arrayBuffer());
        const result = await model.generateContent([
            {
                inlineData: {
                data: Buffer.from(pdfResp).toString("base64"),
                mimeType: "application/pdf",
                },
            },
            DocumentSummaryPrompt,
        ]);
        return result.response.text();
    } catch (error) {
        console.log(error);
        throw new Error('Error while generating document summary');
    }
}
//TODO->next for the resume taken and get the job fit dialog when applying (shd make structured for it with good prompting ig)
export default model;
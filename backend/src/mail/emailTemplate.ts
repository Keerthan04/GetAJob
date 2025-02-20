
export const emailTemplates = {
  ACCEPTED: (userName: string, jobTitle: string, companyName: string) => ({
    subject: `Congratulations! Your Application for ${jobTitle} has been Accepted 🎉`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #003566;">GetAJob</h2>
        <p>Hi ${userName},</p>
        <p>Your recent application for <strong>${jobTitle}</strong> of <strong>${companyName}</strong> has been <span style="color: green; font-weight: bold;">Accepted</span>.</p>
        <p>The employer will reach out to you soon regarding the next steps.</p>
        <p>Best of luck! 🚀</p>
        <hr/>
        <p style="font-size: 12px; color: gray;">This is an automated message from GetAJob.</p>
      </div>
    `,
  }),

  REJECTED: (userName: string, jobTitle: string, companyName: string) => ({
    subject: `Update on Your Application for ${jobTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #003566;">GetAJob</h2>
        <p>Hi ${userName},</p>
        <p>We appreciate your application for <strong>${jobTitle}</strong> of <strong>${companyName}</strong>.</p>
        <p>Unfortunately, the employer has decided to move forward with other candidates.</p>
        <p>Don't be discouraged! Keep applying, and your dream job will come soon. 💪</p>
        <hr/>
        <p style="font-size: 12px; color: gray;">This is an automated message from GetAJob.</p>
      </div>
    `,
  }),

  SHORTLISTED: (userName: string, jobTitle: string, companyName: string) => ({
    subject: `Your Application for ${jobTitle} has been Shortlisted!`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #003566;">GetAJob</h2>
        <p>Hi ${userName},</p>
        <p>Great news! Your application for <strong>${jobTitle}</strong> of <strong>${companyName}</strong> has been <span style="color: orange; font-weight: bold;">Shortlisted</span>.</p>
        <p>The employer may reach out soon for further steps.</p>
        <p>Keep an eye on your inbox!</p>
        <hr/>
        <p style="font-size: 12px; color: gray;">This is an automated message from GetAJob.</p>
      </div>
    `,
  }),
};

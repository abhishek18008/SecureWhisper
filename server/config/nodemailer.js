import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "abhishekkumargupta18008@gmail.com",
    pass: "dqbh avcv gdnv czqw",
    clientId: "1096679194143-j2f561h1cvrad4niq7tesjhttslp9ojj.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken: "1//04pqhOvuCO4a1CgYIARAAGAQSNwF-L9Ir3dZvUfvLa4a_2lXUwbM9H91rs2ZRsn5djgSKUQcSgLSEWHc8UKsMBqXJv0HkxEmCsSE",
  },
});

export default transporter;

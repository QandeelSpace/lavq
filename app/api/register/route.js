// app/api/register/route.js
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

export async function POST(request) {
  console.log("📞 /api/register POST called");
  
  try {
    const body = await request.json();
    console.log("📝 Received data:", body);

    // Save to file (even if email fails)
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "registrations.json");

    // Ensure data folder exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing data
    let current = [];
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf8");
        current = JSON.parse(fileContent || "[]");
      } catch(e) {
        console.error("Error reading file:", e);
        current = [];
      }
    }

    const entry = { 
      ...body, 
      id: Date.now(),
      createdAt: new Date().toISOString() 
    };
    
    current.unshift(entry);
    fs.writeFileSync(filePath, JSON.stringify(current, null, 2), "utf8");
    
    console.log("💾 Saved to file:", filePath);

    // Try to send email (but don't fail if it doesn't work)
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { 
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS 
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `New LAVQ Registration - ${entry.name || "No Name"}`,
          text: `New registration:\n\nName: ${entry.name}\nEmail: ${entry.email}\nPhone: ${entry.phone}\nPlan: ${entry.plan}\nTime: ${entry.createdAt}`,
        });
        
        console.log("📧 Email sent successfully");
      } else {
        console.warn("⚠️ Email credentials not set, skipping email");
      }
    } catch (emailError) {
      console.warn("⚠️ Email failed but registration saved:", emailError.message);
      // Don't throw - registration was saved successfully
    }

    // Return success
    return Response.json({ 
      success: true, 
      message: "Registration saved successfully",
      saved: true
    });

  } catch (err) {
    console.error("❌ API Error:", err);
    return Response.json({ 
      success: false, 
      error: err.message 
    }, { status: 500 });
  }
}

// Add GET method for testing
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "registrations.json");
    
    if (!fs.existsSync(filePath)) {
      return Response.json({ 
        message: "No registrations yet",
        count: 0,
        data: []
      });
    }

    const data = fs.readFileSync(filePath, "utf8");
    const registrations = JSON.parse(data);
    
    return Response.json({
      message: "Registrations loaded",
      count: registrations.length,
      data: registrations
    });

  } catch (error) {
    return Response.json({ 
      error: error.message 
    }, { status: 500 });
  }
}
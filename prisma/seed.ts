import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Jandify Global database…");

  // Default super admin
  const existing = await prisma.adminUser.findUnique({ where: { email: "admin@jandifyglobal.com" } });
  if (!existing) {
    const hash = await bcrypt.hash("Admin@123456", 12);
    await prisma.adminUser.create({
      data: {
        email: "admin@jandifyglobal.com",
        name: "Super Admin",
        password: hash,
        role: "SUPER_ADMIN",
        isActive: true,
      },
    });
    console.log("✅ Created default admin: admin@jandifyglobal.com / Admin@123456");
  }

  // Sample testimonials
  const testimonialsCount = await prisma.testimonial.count();
  if (testimonialsCount === 0) {
    await prisma.testimonial.createMany({
      data: [
        { name: "Adaeze Okonkwo", role: "Master's Student", country: "Portugal", flag: "🇵🇹", service: "Study Abroad", rating: 5, approved: true, featured: true, content: "Jandify Global helped me navigate the Portuguese university application from scratch. I'm now studying in Lisbon on a partial scholarship!" },
        { name: "Chukwuemeka Balogun", role: "DAAD Scholarship Recipient", country: "Germany", flag: "🇩🇪", service: "Scholarships", rating: 5, approved: true, featured: true, content: "Got the DAAD scholarship on my first attempt thanks to Jandify's guidance. Their advisor knew exactly what German universities look for." },
        { name: "Fatima Abubakar", role: "Work Permit Holder", country: "Canada", flag: "🇨🇦", service: "Visa Support", rating: 5, approved: true, featured: false, content: "Professional service, real results. The step-by-step support made the Canadian study permit process feel manageable." },
        { name: "Tobi Adewale", role: "Undergraduate Student", country: "Netherlands", flag: "🇳🇱", service: "Study Abroad", rating: 5, approved: true, featured: false, content: "Didn't think I could afford to study abroad until Jandify showed me affordable English programs in the Netherlands. Now enrolled!" },
      ],
    });
    console.log("✅ Created sample testimonials");
  }

  // Default settings
  const settingsCount = await prisma.setting.count();
  if (settingsCount === 0) {
    await prisma.setting.createMany({
      data: [
        { key: "site_name", value: "Jandify Global", group: "Brand", label: "Site Name" },
        { key: "tagline", value: "Your Guide to Universities Worldwide", group: "Brand", label: "Tagline" },
        { key: "email", value: "hello@jandifyglobal.com", group: "Brand", label: "Contact Email" },
        { key: "consultation_enabled", value: "true", group: "Features", label: "Consultation Booking" },
        { key: "newsletter_enabled", value: "true", group: "Features", label: "Newsletter" },
      ],
    });
    console.log("✅ Created default settings");
  }

  console.log("✅ Seed complete!");
}

main().catch(console.error).finally(() => prisma.$disconnect());

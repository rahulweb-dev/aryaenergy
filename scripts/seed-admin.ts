import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";

async function main() {
  const uri = process.env.MONGODB_URI;
  const name = process.env.ADMIN_SEED_NAME ?? "Super Admin";
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!uri) throw new Error("Missing MONGODB_URI");
  if (!email || !password) throw new Error("Missing ADMIN_SEED_EMAIL or ADMIN_SEED_PASSWORD");

  await mongoose.connect(uri);

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    console.log(`User ${email} already exists (role: ${existing.role}). Nothing to do.`);
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await User.create({
    name,
    email: email.toLowerCase(),
    passwordHash,
    role: "super_admin",
  });

  console.log(`Created super admin user: ${email}`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

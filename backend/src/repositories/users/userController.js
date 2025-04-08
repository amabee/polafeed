import { prisma } from "../../utils/db.js";

import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export const signup = async (data) => {
  const numericUuid = uuidv4().replace(/\D/g, "").slice(0, 12);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const newUser = await prisma.user.create({
    data: {
      id: parseInt(numericUuid),
      username: data.username,
      email: data.email,
      password: hashedPassword,
    },
  });
};

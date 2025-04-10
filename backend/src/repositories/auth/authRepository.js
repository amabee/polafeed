import { prisma } from "../../utils/db.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import {
  checkForExistingUser,
  generateAuthToken,
  parseBirthday,
} from "../../utils/authHelper.js";
import { addDays } from "date-fns";

export const signup = async (data) => {
  const numericUuid = uuidv4().replace(/\D/g, "").slice(0, 12);
  const customizationUuid = uuidv4();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const birthDate = parseBirthday(data.birthday);

  return await prisma.$transaction(async (prisma) => {
    await checkForExistingUser(prisma, data);

    const newUser = await prisma.user.create({
      data: {
        id: numericUuid,
        username: data.username,
        email: data.email,
        password: hashedPassword,
        lastLogin: null,
        userInformation: {
          create: {
            firstName: data.firstname,
            lastName: data.lastname,
            gender: data.gender,
            address: data.address,
            phone: data.phone,
            birthDate: birthDate,
          },
        },
        UserCustomization: {
          create: {
            id: customizationUuid,
            backgroundStyle: {
              type: "color",
              data: "#ffffff",
            },
            profileCardStyle: {
              layout: "default",
              borderWidth: "2px",
              borderRadius: "12px",
              shadow: true,
            },
            loadingScreen: "spinner",
            theme: "light",
            font: "Roboto",
          },
        },
      },
    });

    return newUser;
  });
};

export const login = async (credentials, req) => {
  if (!credentials.username || !credentials.password) {
    throw new Error("Username / Email and Password are required");
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: credentials.username }, { email: credentials.username }],
    },
    include: {
      userInformation: true,
      UserCustomization: true,
    },
  });

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isPasswordValid = await bcrypt.compare(
    credentials.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid username or password");
  }

  const token = generateAuthToken(user);

  await updateLastLogin(user.id);

  // Create the session

  await prisma.session.create({
    data: {
      userId: user.id,
      token: token,
      userAgent: req?.headers["user-agent"],
      ipAddress: req?.ip || null,
      expiresAt: addDays(new Date(), 7),
    },
  });

  const { password, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token: token,
  };
};

async function updateLastLogin(userId) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      lastLogin: new Date(),
    },
  });
}

import jwt from "jsonwebtoken";

export async function checkForExistingUser(prisma, data) {
  const isExistingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { username: data.username },
        { email: data.email },
        {
          userInformation: {
            phone: data.phone,
          },
        },
      ],
    },
    include: {
      userInformation: true,
    },
  });

  if (isExistingUser) {
    if (isExistingUser.username === data.username) {
      throw new Error("Username is already taken");
    }
    if (isExistingUser.email === data.email) {
      throw new Error("Email is already taken");
    }
    if (isExistingUser.userInformation.phone === data.phone) {
      throw new Error("Phone number is already taken");
    }
  }
}

export function parseBirthday(birthday) {
  try {
    if (typeof birthday === "string") {
      if (birthday.includes("/")) {
        const birthdayArray = birthday.split("/");

        if (birthdayArray.length !== 3) {
          throw new Error("Birthday must be in MM/DD/YYYY format");
        }

        const month = parseInt(birthdayArray[0], 10);
        const day = parseInt(birthdayArray[1], 10);
        const year = parseInt(birthdayArray[2], 10);

        const birthDate = new Date(year, month - 1, day);

        if (
          isNaN(birthDate.getTime()) ||
          birthDate.getMonth() !== month - 1 ||
          birthDate.getDate() !== day
        ) {
          throw new Error("Invalid date components");
        }

        return birthDate;
      } else {
        const birthDate = new Date(birthday);
        if (isNaN(birthDate.getTime())) {
          throw new Error("Could not parse birthday string");
        }
        return birthDate;
      }
    } else if (birthday instanceof Date) {
      if (isNaN(birthday.getTime())) {
        throw new Error("Invalid Date object");
      }
      return birthday;
    } else {
      throw new Error(
        "Birthday must be a string in MM/DD/YYYY format or a valid Date object"
      );
    }
  } catch (error) {
    console.error("Birthday parsing error:", error.message, "Value:", birthday);
    throw new Error("Invalid birthdate format: " + error.message);
  }
}

export function generateAuthToken(user) {
  const payload = {
    userId: user.id,
    iat: Math.floor(Date.now() / 1000),
    jti: crypto.randomUUID(),
    iss: 'polafeed-api',
    sub: user.id.toString(),
  };

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT secret is not configured");
  }

  return jwt.sign(payload, jwtSecret, {
    expiresIn: "24h",
    algorithm: "HS256"
  });
}

export const validateToken = (token) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT secret is not configured");
    }

    return jwt.verify(token, jwtSecret);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token has expired");
    }

    throw new "Invalid token"();
  }
};

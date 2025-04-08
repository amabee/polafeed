import { prisma } from "../../utils/db.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export const signup = async (data) => {
  const numericUuid = uuidv4().replace(/\D/g, "").slice(0, 12);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  let birthDate;
  try {
    if (typeof data.birthday === "string") {
      if (data.birthday.includes("/")) {
        const birthdayArray = data.birthday.split("/");

        if (birthdayArray.length !== 3) {
          throw new Error("Birthday must be in MM/DD/YYYY format");
        }

        const month = parseInt(birthdayArray[0], 10);
        const day = parseInt(birthdayArray[1], 10);
        const year = parseInt(birthdayArray[2], 10);

        birthDate = new Date(year, month - 1, day);

        if (
          isNaN(birthDate.getTime()) ||
          birthDate.getMonth() !== month - 1 ||
          birthDate.getDate() !== day
        ) {
          throw new Error("Invalid date components");
        }
      } else {
        birthDate = new Date(data.birthday);
        if (isNaN(birthDate.getTime())) {
          throw new Error("Could not parse birthday string");
        }
      }
    } else if (data.birthday instanceof Date) {
      birthDate = data.birthday;
      if (isNaN(birthDate.getTime())) {
        throw new Error("Invalid Date object");
      }
    } else {
      throw new Error(
        "Birthday must be a string in MM/DD/YYYY format or a valid Date object"
      );
    }
  } catch (error) {
    console.error(
      "Birthday parsing error:",
      error.message,
      "Value:",
      data.birthday
    );
    throw new Error("Invalid birthdate format: " + error.message);
  }

  const transaction = await prisma.$transaction(async (prisma) => {
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

    const newUser = await prisma.user.create({
      data: {
        id: numericUuid,
        username: data.username,
        email: data.email,
        password: hashedPassword,
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
      },
    });

    return newUser;
  });

  return transaction;
};

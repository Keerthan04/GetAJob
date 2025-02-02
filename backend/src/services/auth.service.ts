import { Employer, RegisterUserRequest, User,RegisterEmployerRequest } from "../Types/users";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import { prisma } from "../db/db";

/**
 * Retrieves a user from the database based on their email.
 *
 * @param email - The email address of the user to retrieve.
 * @returns The user if found, otherwise null.
 */
export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user:User | null = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return null;
  }

  return user;
};


/**
 * Compares a plain text password with a hashed password.
 *
 * @param password - The plain text password to compare.
 * @param hashedPassword - The hashed password to compare with.
 * @returns A boolean indicating if the passwords match.
 * @throws Will throw an error if there is an issue during password comparison.
 */
export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  //shd be bcrypt logic
  try {
    return await bycrypt.compare(password, hashedPassword);
  } catch (error) {
    throw error;
  }
};



/**
 * Generates a JWT token for the provided user.
 *
 * @param user - The user for which a token should be generated.
 * @returns A JWT token containing the user's email and id as payload.
 * @throws Will throw an error if there is an issue during token generation.
 */
export const generateToken = (user: User | Employer): string => {
  //since both email and id are unique we can use them as payload for jwt
  try {
    const {email,id} = user;
    return jwt.sign({ email, id }, process.env.JWT_SECRET as string);
  } catch (error) {
    throw error;
  }
};


/**
 * Retrieves a user from the database based on their email, excluding the password.
 *
 * @param email - The email address of the user to retrieve.
 * @returns The user details, excluding the password.
 * @throws Will throw an error if there is an issue during user retrieval.
 */
export const getUserWithoutPassword = async (
  email: string
): Promise<Omit<User, "password">> => {
  const user = (await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      password: false,
      id: true,
      name: true,
      email: true,
      location: true,
      skills: true,
      experience: true,
      education: true,
      resumeLink: true,
      portfolio: true,
      jobTitle: true,
      jobType: true,
      availability: true,
    },
  })) as Omit<User, "password">;
  return user;
};


/**
 * Creates a new user in the database with the provided user details.
 *
 * @param user - The user data for registration, excluding the password.
 * @returns The newly created user details, without the password.
 * @throws Will throw an error if there is an issue during user creation.
 */

export const createUser = async (
  user: RegisterUserRequest
): Promise<Omit<User, "password">> => {
  const hashedPassword = await bycrypt.hash(user.password, 10);
  user.password = hashedPassword;
  try {
    const newUser = await prisma.user.create({
      data: user,
      select: {
        id: true,
        name: true,
        email: true,
        location: true,
        skills: true,
        experience: true,
        education: true,
        resumeLink: true,
        portfolio: true,
        jobTitle: true,
        jobType: true,
        availability: true,
      },
    }) as Omit<User, "password">;
    return newUser;
  } catch (error) {
    throw error;
  }
};


/**
 * Retrieves an employer from the database based on their email.
 *
 * @param email - The email address of the employer to retrieve.
 * @returns The employer if found, otherwise null.
 */
export const findEmployerByEmail = async (email: string): Promise<Employer | null> => {
  const employer = await prisma.employer.findUnique({
    where: {
      email,
    },
  });
  if (!employer) {
    return null;
  }
  return employer;
}
//TODO -> make only one function for both employer and user which retrives and gives back for some common functions

/**
 * Retrieves an employer from the database based on their email, excluding the password.
 *
 * @param email - The email address of the employer to retrieve.
 * @returns The employer details, excluding the password.
 * @throws Will throw an error if there is an issue during employer retrieval.
 */
export const getEmployerWithoutPassword = async (
  email: string
): Promise<Omit<Employer, "password">> => {
  const employer = (await prisma.employer.findUnique({
    where: {
      email,
    },
    select: {
      password: false,
      id: true,
      name: true,
      email: true,
      companyName: true,
      companyWebsite: true,
      companySize: true,
      industry: true,
      location: true,
      description: true,
      logoUrl: true,
      verified: true,
    },
  })) as Omit<Employer, "password">;
  return employer;
};

/**
 * Creates a new employer in the database.
 *
 * @param employer - The employer details to create.
 * @returns The newly created employer, excluding the password.
 * @throws Will throw an error if there is an issue during employer creation.
 */
export const createEmployer = async (
  employer: RegisterEmployerRequest
): Promise<Omit<Employer, "password">> => {
  const hashedPassword = await bycrypt.hash(employer.password, 10);
  employer.password = hashedPassword;
  try {
    const newEmployer = await prisma.employer.create({
      data: employer,
      select: {
        id: true,
        name: true,
        email: true,
        companyName: true,
        companyWebsite: true,
        companySize: true,
        industry: true,
        location: true,
        description: true,
        logoUrl: true,
        verified: true,
      },
    }) as Omit<Employer, "password">;
    return newEmployer;
  } catch (error) {
    throw error;
  }
}
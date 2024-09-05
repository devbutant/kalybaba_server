import * as bcrypt from 'bcrypt';

export async function passwordHash(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}

export async function passwordCompare(
  password: string,
  storedHash: string,
): Promise<boolean> {
  const isMatching = await bcrypt.compare(password, storedHash);
  return isMatching;
}

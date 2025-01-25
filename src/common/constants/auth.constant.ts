export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY,
  expiresIn: '15d',
  expiresInNum: 15,
};

export const bycryptConstants = {
  saltRounds: 11,
};

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLenght: [3, "User's name must contain at least 3 characters!"],
      minLenght: [40, "User's name must not contain more than 40 characters!"],
      trim: true,
      required: [true, "User must have a name!"],
    },
    lastName: {
      type: String,
      minLenght: [3, "User's lastname must contain at least 3 characters!"],
      minLenght: [
        40,
        "User's lastname must not contain more than 40 characters!",
      ],
      trim: true,
      required: [true, "User must have a name!"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "User must have an e-mail!"],
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: (props) => `${props.value} must be a valid e-mail}!`,
      },
      unique: [true, "This user already exist!"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    password: {
      type: String,
      required: [true, "User must have a password!"],
      minLenght: [8, "Password must have at least 8 characters!"],
    },
    passwordConfirm: {
      type: String,
    },
    passwordChangedAt: {
      type: Date,
    },
    avatar: {
      type: String,
      trim: true,
    },
    likedProducts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
    likedArticles: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Article",
      },
    ],
    addedReviews: [{ type: mongoose.Schema.ObjectId, ref: "Review" }],
    addedComments: [{ type: mongoose.Schema.ObjectId, ref: "Comment" }],
  },

  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// userSchema.virtual("addedComments", {
//   ref: "Product",
//   localField: "_id",
//   foreignField: "userID",
// });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;

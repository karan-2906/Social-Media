const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.models')
const { sendVerificationEmail, generateverificationToken, resetPasswordEmail, generateOTP } = require('../utils/email')
const { successFullVerification } = require('../utils/EmailTemplate')



const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !password || !email) {
            return res.status(400).json({ message: "Not all fields have been entered" })
        }

        if (password.length < 6) {

            return res.status(400).json({ message: "The password needs to be at least 6 characters long" })
        }

        const existedUser = await User.findOne({
            $or: [{ username }, { email }],
        });
        if (existedUser) {
            return res.status(400).json({ message: "An account with this username or email  already exists" })
        }

        else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const verificationToken = generateverificationToken(email);
            const newUser = await User.create({
                username,
                email,
                password: hashedPassword,
                verificationToken
            })
            await sendVerificationEmail(email, verificationToken);
            const token = jwt.sign({
                user: newUser
            },

                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            )
            res.json({ message: 'Registration successful. Please check your email for verification.', verificationToken: verificationToken, user: newUser, token: token });
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error);
    }
}

const verifyemail = async (req, res) => {
    try {
        const tokenId = req.params.tokenId;
        const user = await User.findOne({ verificationToken: tokenId });

        if (!user) {
            return res.status(404).json({ error: 'Invalid verification token.' });
        }

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        const congratulationContent = successFullVerification();

        res.send(congratulationContent);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred during email verification.' });
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Not all fields have been entered" });
        }

        const user = await User.findOne({ email });
        console.log(user)

        if (!user) {
            return res.status(400).json({ message: "Account with this email does not exist!!" });
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: "Please verify your email to login" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid)

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Sign the JWT token
        const token = jwt.sign(
            {
                user: user,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            user: user,
            token: token,
            message: "User logged in",
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

const updateavatar = async (req, res) => {
    const { avatar } = req.body;
    try {
        const { userId } = req.params;
        if (!avatar) {
            return res.status(400).json({ msg: "No avatar was added" });
        }

        // Find the user by their userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: "No user with this ID" });
        }

        // Update the avatar URL
        user.avatar.url = avatar;


        await user.save();

        res.json({ avatar: avatar, msg: "Avatar updated successfully!" });

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
}

const userInfo = async (req, res) => {
    res.status(200).json({ message: 'Authentication successful', user: req.user });
};


const userProfile = async (req, res) => {
    const { userID } = req.params;
    try {
        const user = await User.findById(userID).select('-password');

        if (!user) {
            return res.status(404).json({ msg: "No user with this ID" });
        }

        res.status(200).json({ user: user, msg: 'success' });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};


const userFollowUnfollow = async (req, res) => {
    const { followUserID } = req.params;
    try {
        const user = req.user._id;
        const followUser = await User.findById(followUserID)
        if (!followUser) {
            return res.status(404).json({ msg: "No user with this ID" });
        }
        const currentUser = await User.findById(user);
        if (!currentUser) {
            return res.status(404).json({ msg: "No user with this ID" });
        }

        const isFollowing = currentUser.following.includes(followUserID);
        if (isFollowing) {
            currentUser.following.pull(followUserID);
            followUser.followers.pull(user);
        } else {
            currentUser.following.push(followUserID);
            followUser.followers.push(user);
        }
        await currentUser.save();
        await followUser.save();

        if (isFollowing) {
            res.status(200).json({ msg: 'unfollowed', followUser: followUser, currentUser: currentUser });
        } else {
            res.status(200).json({ msg: 'followed', followUser: followUser, currentUser: currentUser });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);

    }
}


const editProfile = async (req, res) => {
    const { bio, username } = req.body;
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "No user with this ID" });
        }
        user.bio = bio;
        user.username = username;
        await user.save();
        res.status(200).json({ msg: "user updated succesfully", user: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
}



module.exports = {
    registerUser,
    loginUser,
    verifyemail,
    updateavatar,
    userInfo,
    userProfile,
    userFollowUnfollow,
    editProfile

}
import  Router  from "express";
import jwt from "jsonwebtoken";
import User from "../model/UserSchema.js";
import Watchlist from "../model/WatchlistSchema.js";
import Movie from "../model/MovieSchema.js";
import Review from "../model/ReviewSchema.js";

const auth = Router();

auth.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
       const findUser = await User.findOne({username});
        if (!findUser) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const isMatch = await findUser.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        // Optionally, generate JWT here and send it to the client
        const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token, findUser});
    } catch (error) {
        res.status(500).json({message: "server: " + error.message});
    }

});

auth.post("/register", async (req, res) => {
    const { username, useremail, password, watchlist, favorites }= req.body;

    try {
        const existingUser = await User.findOne({username});
        if(existingUser){ return res.status(400).json({message: "User already exists"})}
        const user = new User({ username, useremail, password, watchlist, favorites });
        await user.save();
        res.status(200).json({message: 'User registered'})
    } catch (error) {
        res.status(500).json({message: 'Server error: ' + error.message});
    };
});

auth.post('/favoriteMovies', async (req, res) => {
  try {
    const { userId, movieDetails } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Find or create the movie in the Movie collection
    let movie = await Movie.findOne({ tmdbId: movieDetails.id });
    if (!movie) {
      movie = new Movie({
        tmdbId: movieDetails.id,
        title: movieDetails.title,
        poster_path: movieDetails.poster_path,
        release_date: movieDetails.release_date,
        genre_ids: movieDetails.genre_ids,
        overview: movieDetails.overview,
        popularity: movieDetails.popularity
      });
      
      await movie.save();
    }

    // Add movie to user's favorites if not already present
    user.favorites = user.favorites || [];
    if (user.favorites.includes(movie._id)) {
      return res.status(400).json({ message: 'Movie already in favorites.' });
    }
    user.favorites.push(movie._id);
    await user.save();

    res.status(200).json({ message: 'Movie added to favorites!', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

auth.post('/watchlist', async (req, res) => {
  try {
    const { userId, movieDetails } = req.body;
    
    const user  = await User.findById(userId);
    if(!user){ return res.status(404).json({ message: 'User not found' })};

    let watchlist = await Watchlist.findOne({ tmdbId: movieDetails.id });
    if (!watchlist) {
      watchlist = new Watchlist({ tmdbId: movieDetails.id, name: movieDetails.title });
      await watchlist.save();
    } 
    
    // Add movie to user's watchlist if not already present
    user.watchlist = user.watchlist || [];
    if (user.watchlist.includes(watchlist._id)) {
        return res.status(400).json({ message: 'Movie already in watchlist.' });
      }
    user.watchlist.push(watchlist._id);
    
    await user.save();
    res.status(201).json({ message: 'Movie added to watchlist!', watchlist });
    console.log('ok');
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong while saving to watchlist.' });
  }
});

auth.get('/watchlist/:id', async (req, res) => {
  try {
    // const { userId, movieId } = req.params.id;
    const { id } = req.params.id;
    let watchlist = await Watchlist.find();
    res.status(201).json({data: watchlist});
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong while saving to watchlist.' });
  }
});

auth.post("/logout", (req, res) => {
    const { token } = req.body;
    res.status(201).json({message: "logout successful!"})
});

auth.post('/review', async (req, res) => {
  try {
    const { userId, movieId, rating, comment, movieDetails } = req.body;
    // Find or create the movie in the Movie collection
    let movie = await Movie.findOne({ tmdbId: movieDetails.id });
    if (!movie) {
      movie = new Movie({
        tmdbId: movieDetails.id,
        title: movieDetails.title,
        poster_path: movieDetails.poster_path,
        release_date: movieDetails.release_date,
        genre_ids: movieDetails.genre_ids,
        overview: movieDetails.overview,
        popularity: movieDetails.popularity
      });
      await movie.save();
    }
    // Save review with MongoDB movie _id
    const review = new Review({
      user: userId,
      movie: movie._id,
      rating,
      comment
    });
    await review.save();
    res.status(201).json({ message: 'Review saved!', review });
  } catch (error) {
    res.status(500).json({ message: 'Error saving review: ' + error.message });
  }
});

auth.get('/reviews/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    // Find the movie by TMDB ID
    const movieDoc = await Movie.findOne({ tmdbId: movieId });
    if (!movieDoc) {
      return res.status(404).json({ message: 'Movie not found.' });
    }
    // Use the MongoDB _id to find reviews
    const reviews = await Review.find({ movie: movieDoc._id });
    // .populate('user', 'username'); // Uncomment if you want user info
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews: ' + error.message });
  }
});

auth.put('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, useremail, password } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    if (username) user.username = username;
    if (useremail) user.useremail = useremail;
    if (password) user.password = password; // Make sure password hashing is handled in UserSchema
    await user.save();
    res.status(200).json({ message: 'Profile updated!', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile: ' + error.message });
  }
});

auth.get('/favorites/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('favorites');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.status(200).json({ movies: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites: ' + error.message });
  }
});

auth.get('/watchlist/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('watchlist');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.status(200).json({ movies: user.watchlist });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching watchlist: ' + error.message });
  }
});

export default auth;

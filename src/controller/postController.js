const Post = require("../model/post.js");

// Créer un nouveau post
exports.createPost = async (req, res) => {
    try {
        const { title, content, username } = req.body;
        const finalUsername = username && username.trim() ? username.trim() : 'Anonymous';
        const newPost = new Post({ title, content, username: finalUsername });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du post.', details: error.message, stack: error.stack });
    }
};

// Obtenir tous les posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des posts.' });
    }
};

// Obtenir un post par son ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post non trouvé.' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du post.' });
    }
};

// Mettre à jour un post
exports.updatePost = async (req, res) => {
    try {
        const { title, content, username } = req.body;
        const updateFields = { title, content, updatedAt: Date.now() };
        updateFields.username = username && username.trim() ? username.trim() : 'Anonymous';
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true, runValidators: true }
        );

        if (!updatedPost) return res.status(404).json({ error: 'Post non trouvé.' });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du post.' });
    }
};

// Supprimer un post
exports.deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ error: 'Post non trouvé.' });
        res.json({ message: 'Post supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du post.' });
    }
};



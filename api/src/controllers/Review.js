const { Types: { ObjectId } } = require('mongoose');

const Review = require('../models/Review');

const getReviews = async (req, res) => {
  try {
    const {
      query: {
        limit = 12,
        page = 1,
        sort = '-createdAt',
      },
      userId,
    } = req;

    if (page < 1 || limit < 1) return res.status(400).send('Página inválida.');

    const reviewsPromise = Review.find({ user: userId })
      .limit(Number(limit))
      .skip(Number(limit * page - limit))
      .sort(sort)
      .populate('wine');

    const countPromise = Review.countDocuments({ user: userId });

    const [reviews, count] = await Promise.all([reviewsPromise, countPromise]);

    return res.json({
      pages: Math.ceil(count / limit),
      reviews,
      total: count,
    });
  } catch (error) {
    return res.status(500).send('Erro interno no servidor.');
  }
};

const getReviewsByWine = async (req, res) => {
  try {
    const {
      params: { id },
      query: {
        limit = 12,
        page = 1,
        sort = '-createdAt',
      },
    } = req;

    if (!ObjectId.isValid(id)) return res.status(400).send('ID inválido.');

    const reviewsPromise = Review.find({ wine: id })
      .limit(Number(limit))
      .skip(Number(limit * page - limit))
      .sort(sort)
      .populate('user');

    const countPromise = Review.countDocuments({ wine: id });

    const [reviews, count] = await Promise.all([reviewsPromise, countPromise]);

    return res.json({
      pages: Math.ceil(count / limit),
      reviews,
      total: count,
    });
  } catch (error) {
    return res.status(500).send('Erro interno no servidor.');
  }
};

const getReviewsByMonth = async (req, res) => {
  try {
    const {
      query: {
        limit = 12,
        month = new Date().getMonth() + 1,
        page = 1,
        sort = '-createdAt',
        year = new Date().getFullYear(),
      },
      userId,
    } = req;

    const lastDay = new Date(year, month, 0).getDate();

    const query = {
      user: userId,
      createdAt: {
        $gte: new Date(`${year}-${month}-01`),
        $lte: new Date(`${year}-${month}-${lastDay}T23:59:59.999Z`),
      },
    };

    const reviewsPromise = Review.find(query)
      .limit(Number(limit))
      .skip(Number(limit * page - limit))
      .sort(sort)
      .populate('wine');

    const countPromise = Review.countDocuments(query);

    const [reviews, count] = await Promise.all([reviewsPromise, countPromise]);

    return res.json({
      pages: Math.ceil(count / limit),
      reviews,
      total: count,
    });
  } catch (error) {
    return res.status(500).send('Erro interno no servidor.');
  }
};

const createReview = async (req, res) => {
  try {
    const {
      body: { wine },
      userId,
    } = req;

    const hasReview = await Review.findOne({ user: userId, wine });
    if (hasReview) {
      return res.status(409).send('Você já avaliou esse vinho.');
    }

    const review = await Review.create({ ...req.body, user: userId });
    return res.json({ review });
  } catch (error) {
    return res.status(500).send('Erro interno no servidor.');
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).send('ID inválido.');

    const { userId } = req;
    if (userId !== req.body.user) {
      return res.status(403).send('Não é possível editar review de outro usuário.');
    }

    const review = await Review.findByIdAndUpdate(id, req.body, { new: true });
    return res.json({ review });
  } catch (error) {
    return res.status(500).send('Erro interno no servidor.');
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).send('ID inválido.');

    const { userId } = req;
    const review = await Review.findById(id);
    if (userId !== review.user.toString()) {
      return res.status(403).send('Não é possível deletar review de outro usuário.');
    }

    await review.remove();
    return res.json({ review });
  } catch (error) {
    return res.status(500).send('Erro interno no servidor.');
  }
};

module.exports = {
  createReview,
  deleteReview,
  getReviews,
  getReviewsByMonth,
  getReviewsByWine,
  updateReview,
};

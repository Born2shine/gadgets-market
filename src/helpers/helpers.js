export const getPriceQueryParams = (queryParams, key, value) => {
  const hasValueInParams = queryParams.has(key);

  if (value && hasValueInParams) {
    queryParams.set(key, value);
  } else if (value) {
    queryParams.append(key, value);
  } else if (hasValueInParams) {
    queryParams.delete(key);
  }

  return queryParams;
};

export const parseCallbackUrl = (url) => {
  const res = url.replace(/%3A/g, ":").replace(/%2F/g, "/");

  return res;
};

export const getUserReview = (reviews, userId) => {
  let userReview = null;

  reviews.forEach((review) => {
    if (review?.user?._id === userId) {
      userReview = review;
    }
  });

  return userReview;
};

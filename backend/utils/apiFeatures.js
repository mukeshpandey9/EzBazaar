class ApiFeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }

  search() {
    const keyword = this.querystr.keyword
      ? {
          $or: [
            { name: { $regex: this.querystr.keyword, $options: "i" } },
            { description: { $regex: this.querystr.keyword, $options: "i" } },
            { category: { $regex: this.querystr.keyword, $options: "i" } },
          ],
        }
      : {};

    // console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.querystr };

    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => {
      delete queryCopy[key];
    });

    // Filter for price and rating

    let querystr = JSON.stringify(queryCopy);
    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(querystr));
    return this;
  }

  //   Pagination

  pagination(resultPerpage) {
    const currentPage = Number(this.querystr.page) || 1;
    const skip = resultPerpage * (currentPage - 1);

    this.query = this.query.limit(resultPerpage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;

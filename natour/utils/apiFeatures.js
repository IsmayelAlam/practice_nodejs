class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const queryObj = { ...this.queryStr };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    const queryReplace = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.query.find(JSON.parse(queryReplace));

    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      this.query.sort(
        this.queryStr.sort.includes(",")
          ? this.queryStr.sort.split(",").join(" ")
          : this.queryStr.sort
      );
    }
    return this;
  }

  limit() {
    if (this.queryStr.fields) {
      this.query.select(this.queryStr.fields.split(",").join(" "));
    }
    return this;
  }

  pagination() {
    if (this.queryStr.page && this.queryStr.limit) {
      const skip = (+this.queryStr.page - 1) * this.queryStr.limit;
      this.query.skip(skip).limit(+this.queryStr.limit);
    }
    return this;
  }
}

module.exports = APIFeatures;

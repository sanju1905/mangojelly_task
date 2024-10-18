const book=require('../server/Book');
exports.getBooks=async(req,res)=>{
    try {
        const data=await book.find({});
        if(!data){
            return res.status(404).json({message:"No data found currently"})
        }
        return res.status(200).json({message:"Data fetched success",data:data})
    } catch (error) {
        console.log(error)
    return res.status(500).json({message:"server Error"})
    }
}

exports.addComicBook = async (req, res) => {
  try {
    const {
      bookName,
      authorName,
      year_of_publication,
      description,
      price,
      discount,
      number_of_pages,
      condition,
    } = req.body;

    // Check for mandatory fields (description and discount are optional)
    if (
      !bookName ||
      !authorName ||
      !year_of_publication ||
      !price ||
      !number_of_pages ||
      !condition
    ) {
      return res
        .status(400)
        .json({ message: "Missing fields. Please fill in all mandatory fields." });
    }

    // Create the new book data
    const addData = new book({
      bookName,
      authorName,
      year_of_publication,
      condition,
      number_of_pages,
      price,
      discount: discount || 0,  // If no discount is provided, default to 0
      description: description || "No description available"  // Default description if not provided
    });

    // Save to the database
    await addData.save();

    return res.status(200).json({ message: "Data saved successfully", data: addData });
  } catch (error) {
    console.error("Error saving book:", error);
    return res.status(500).json({ message: "Server Error. Please try again later." });
  }
};


exports.editBookById = async (req, res) => {
    try {
      const bookId = req.params.id;
      const updateData = req.body;
  
      // Find the book by ID and update it
      const updatedBook = await book.findByIdAndUpdate(bookId, updateData, {
        new: true,  // Return the updated book
        runValidators: true  // Ensure schema validation during update
      });
  
      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      return res.status(200).json({ message: "Book updated successfully", data: updatedBook });
    } catch (error) {
      console.error("Error updating book:", error);
      return res.status(500).json({ message: "Server Error. Please try again later." });
    }
  };
  



  exports.deleteBookById = async (req, res) => {
    try {
      const bookId = req.params.id;
  
      // Find the book by ID and delete it
      const deletedBook = await book.findByIdAndDelete(bookId);
  
      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      return res.status(200).json({ message: "Book deleted successfully", data: deletedBook });
    } catch (error) {
      console.error("Error deleting book:", error);
      return res.status(500).json({ message: "Server Error. Please try again later." });
    }
  };

  
  exports.getBookById = async (req, res) => {
    try {
      const bookId = req.params.id;
  
      // Find the book by ID
      const Books = await book.findById(bookId);
  
      if (!Books) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      return res.status(200).json({ message: "Book retrieved successfully", data: Books });
    } catch (error) {
      console.error("Error retrieving book:", error);
      return res.status(500).json({ message: "Server Error. Please try again later." });
    }
  };
  


exports.getAllComicBooks = async (req, res) => {
  try {
    // Extract pagination, filters, and sorting options from the query parameters
    const { page = 1, limit = 10, sortBy = 'bookName', order = 'asc', ...filters } = req.query;

    // Build the filtering criteria
    const query = {};
    if (filters.authorName) {
      query.authorName = new RegExp(filters.authorName, 'i');  // Case-insensitive search
    }
    if (filters.year_of_publication) {
      query.year_of_publication = filters.year_of_publication;
    }
    if (filters.price) {
      query.price = { $lte: filters.price };  // Filters by price less than or equal to the given value
    }
    if (filters.condition) {
      query.condition = filters.condition;
    }

    // Define the sorting order
    const sortOrder = order === 'desc' ? -1 : 1;
    const sortCriteria = { [sortBy]: sortOrder };

    // Fetch the comic books with pagination, filters, and sorting applied
    const comicBooks = await book.find(query)
      .limit(parseInt(limit))  // Limit the results per page
      .skip((parseInt(page) - 1) * parseInt(limit))  // Skip records for pagination
      .sort(sortCriteria);  // Apply sorting

    // Get the total count of the documents that match the filters (without pagination)
    const totalComicBooks = await book.countDocuments(query);

    // Return the results
    return res.status(200).json({
      message: "Comic books retrieved successfully",
      data: comicBooks,
      total: totalComicBooks,
      page: parseInt(page),
      totalPages: Math.ceil(totalComicBooks / parseInt(limit))
    });
  } catch (error) {
    console.error("Error fetching comic books:", error);
    return res.status(500).json({ message: "Server Error. Please try again later." });
  }
};

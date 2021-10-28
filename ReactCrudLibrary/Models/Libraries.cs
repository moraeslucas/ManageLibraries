using System;
using System.Collections.Generic;

namespace ReactCrudLibrary.Models
{
    public partial class Libraries
    {
        public int LibraryId { get; set; }
        public string LibraryName { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Symbol { get; set; }
    }
}

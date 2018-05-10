;(function ($) {
    var Pager = {
		currentPage: 1,
        init: function (settings, elem) {
            this.settings = $.extend({}, this.settings, settings);
            this.$elem = $(elem).addClass("pager");

            this.render.apply(this);
            return this;
        },
        settings: {
            pages: null,
			previous: "Previous",
			next: "Next"
        },
		previous: function() {
			this.selectPage(this.currentPage - 1);
		},
		next: function() {
			this.selectPage(this.currentPage + 1);
		},
		selectPage: function(page) {
			this.currentPage = page;
			this.render();
			this.$elem.trigger("page.change", this.currentPage);
		},
        render: function() {
			var _ = this,
			$pager = _.$elem,
			_pages = _.settings.pages,
			_currentPage = _.currentPage,
			pagesToPrint = PagesToPrint(_pages, _currentPage);

			$pager.empty();

			// Create previous button
			// Also determine if it's enabled (is there enough numbers for it to be needed or are you on the first page already)
			var previous = $("<li />").text(_.settings.previous).addClass("disabled");
			if (_currentPage != 1)
				previous.removeClass("disabled").on("click", function() {
					_.previous();
				});
			previous.appendTo($pager);

			for (var i = 1; i <= _pages; i++)
				// If the current index is in the pagesToPrint array, we print a button to access that page
				if (pagesToPrint.list.indexOf(i) > -1) {
					var page = $("<li />").text(i).addClass("page").data("page", i).on("click", function() {
						_.selectPage($(this).data("page"));
					});

					if (i === _currentPage)
						page.addClass("active");

					page.appendTo($pager);

				// We also check to see if we have the Ellipses set and if we are on index 2 or one less _pages,
				// we print an ellipses in that place
				} else if ((i === 2 && pagesToPrint.hasFrontEllipses) || (i === _pages - 1 && pagesToPrint.hasBackEllipses)) {
					$("<li />").text("...").addClass("ellipses page").appendTo($pager);
				}

			// Create next button
			// Also determine if it's enabled (is there enough numbers for it to be needed or are you on the last page already)
			var next = $("<li />").text(_.settings.next).addClass("disabled");
			if (_currentPage !== _pages)
				next.removeClass("disabled").on("click", function() {
					_.next();
				});
			next.appendTo($pager);
        },
		setPages: function (pages) {
			this.settings.pages = pages;
			this.render();
		}
    };

	// Aggregate default expected pages to be printed based on current page and always showing first and last
	function PagesToPrint(_pages, _currentPage) {
		var pagesToPrint = [1, _currentPage - 2, _currentPage - 1, _currentPage, _currentPage + 1, _currentPage + 2, _pages],
			hasFrontEllipses = true,
			hasBackEllipses = true;

		// It is assumed with hasFrontEllipses that there are more than one pages before currentpage - 2 and the first page
		// If there is only one page between them, we need to print that page
		if (_currentPage - 4 === 1) {
			pagesToPrint.push(_currentPage - 3);
			hasFrontEllipses = false;
		}

		// It is assumed with hasBackEllipses that there are more than one pages after currentpage + 2 and the last page
		// If there is only one page between them, we need to print that page
		if (_pages - _currentPage === 4) {
			pagesToPrint.push(_currentPage + 3);
			hasBackEllipses = false;
		}

		// To maintain a minimum of 5 pages from 1 or _pages (until a certain currentPage threshhold is met),
		// we check currentPage and if we are within that threshhold, we pad the beginning or end of the pager appropriately
		if (_currentPage === 1 || _currentPage === 2) {
			pagesToPrint.push(4);
			pagesToPrint.push(5);
		}
		if (_currentPage === _pages || _currentPage === _pages - 1 || _currentPage === _pages - 2) {
			pagesToPrint.push(_pages - 3);
			pagesToPrint.push(_pages - 4);
		}
		
		return {
			list: pagesToPrint,
			hasFrontEllipses: hasFrontEllipses,
			hasBackEllipses: hasBackEllipses
		}
	};
	
    $.fn.pager = function (methodOrOptions, args) {
        //Initialize plugin and determine if it is an init call or update to the existing element
        if (Pager[methodOrOptions]) {
            return Pager[methodOrOptions].apply(this.data("pager"), Array.prototype.slice.call(arguments, 1));

        } else if (typeof methodOrOptions === "object" || !methodOrOptions) {
            this.init = function (methodOrOptions, elem) {
                this.options = $.extend({}, this.options, methodOrOptions);
                this.elem = elem;
                this.$elem = $(elem);

                return this;
            };
			
        } else {
            $.error("Method " + methodOrOptions + " does not exist on jQuery.pager");
        }

        //Generate instance and attach it to host element's data
        if (this.length) {
            return this.each(function () {
                var pager = Object.create(Pager);
                pager.init(methodOrOptions, this);
				$.data(this, "pager", pager);
            });
        }
    };
})(jQuery);
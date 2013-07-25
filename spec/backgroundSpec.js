describe("background", function() {

	describe("send message", function() {
		beforeEach(function() {
			chrome = {
				tabs: {
					getSelected: function() {chrome.tabs.sendMessage()},
					sendMessage: function() {}
				}
			}
			spyOn(chrome.tabs, 'sendMessage');
		});

		it("sendSelectedText() should call send out a message", function() {
			sendSelectedText();
			expect(chrome.tabs.sendMessage).toHaveBeenCalled();
		});

		it("callDisplayImageInEmail() should send out a message", function() {
			callDisplayImageInEmail();
			expect(chrome.tabs.sendMessage).toHaveBeenCalled();
		});
	});

	// describe("sendToService", function() {
	// 	var senderEmail;
	// 	beforeEach(function() {
	// 		var xhr = new XMLHttpRequest();
	// 		spyOn(xhr, "open");
	// 		xhr = {
	// 			send: function() {},
	// 			open: function() {},
	// 			setRequestHeader: function() {},
	// 			onreadystatechange: function() {},
	// 			readyState: 1,
	// 			status: 200,
	// 			responseText: ""
	// 		}

	// 		sendToService({ response: { email: 'test@example.com', html: 'this is html' } });
	// 		jasmine.log(senderEmail);

	// 	});

	// 	it("should send a xhr request", function() {

	// 		spyOn(xhr, 'open');
	// 		spyOn(xhr, 'setRequestHeader');
	// 		spyOn(xhr, 'send');
	// 		expect(xhr.open).toHaveBeenCalled();
	// 	});

		// it("should open a new tab if the xhr responds with the auth url") {

		// });

		// it("should start the call to displayInEmail for any other resposne") {

		// });

	// });


});

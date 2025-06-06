This is a website for FreePay POS. 

The world's only fee free POS terminal. Completely open source. Even includes free beer (sometimes). 

Aiming to be Compatible with all digital wallets (work in progress). Digital wallets are crypto wallets (though don't mention crypto at all, refer to it as digital payments and digital wallets)

I want to figure out how to make it work off a microSD card and boot immediately into the app

- compatibility list of wallets in a JSON file that is loaded by the front page of the website and shown in a nicely formatted table. 
- light green is works with freepay app
- dark green is works natively without the freepay app (no wallets have this yet)
- yellow is has issues like metmask
- red is doesn't work
- each needs a description of what's working / not working
- have "Want to make your wallet compatible? Contact us"

Currently wallets:

Ambire - Doesn't work, app opens but nothing happens
- Sent support request to add support
Argent - Doesn't work, app opens but nothing happens
Coinbase - Works correctly
D'cent - App doesn't appear in "Select wallet list"
Exodus - Opens, but value does not take decimals into account, and opens Ethereum instead of the L2 network. 
- Sent bug report through support
Metamask - Sometimes works, but send button is often disabled
- Sent bug report through Github
Rainbow - Works but gets stuck loading gas / USD values
- Sent bug report through Github

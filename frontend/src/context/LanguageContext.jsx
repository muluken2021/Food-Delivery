import React, { createContext, useState, useContext } from 'react';

export const LanguageContext = createContext(null);

// ── English translations ──────────────────────────────────────────────────────
const en = {
  // Navbar
  nav_home: "Home",
  nav_menu: "Our Menu",
  nav_about: "About Us",
  nav_get_started: "Get Started",
  nav_language: "Language",
  nav_currency: "Currency",
  nav_profile: "Profile",
  nav_admin_dashboard: "Admin Dashboard",
  nav_logout: "Logout",

  // Header / Hero
  hero_title: "Meet Yegna Byte, order our food and enjoy your meal",
  hero_badge: "shop Better",
  hero_description: "Ditch the kitchen hassle. Get signature dishes and everyday local favorites cooked by top chefs, riding hot straight to you.",
  hero_shop_now: "Shop Now",
  hero_free_delivery: "Free Delivery",
  hero_sold: "Sold",

  // FeaturedCategories
  categories_heading: "Featured",
  categories_heading_highlight: "Categories",
  categories_subtitle: "Your favourite food partner",
  cat_breakfast: "Breakfast",
  cat_lunch: "Lunch",
  cat_dinner: "Dinner",
  cat_desserts: "Desserts",
  cat_drinks: "Drinks",
  cat_snacks: "Snacks",
  cat_healthy: "Healthy",

  // PopularDishes
  popular_heading: "Our",
  popular_heading_highlight: "Popular",
  popular_heading_rest: "dishes",
  popular_subtitle: "Your favourite food partner",
  popular_browse_menu: "Browse Full Menu",
  popular_buy: "Buy",
  popular_fetching: "Fetching the best dishes for you...",

  // FooterBanner
  footer_banner_title: "Ready to Fill Your Cart",
  footer_banner_title2: "with",
  footer_banner_freshness: "Freshness?",
  footer_banner_desc: "Shop farm-fresh groceries, daily essentials, and exclusive deals — delivered straight to your doorstep.",
  footer_banner_cta: "Grab Today's Deals",

  // Testimonials
  testimonials_heading: "What Our",
  testimonials_heading_highlight: "Customers",
  testimonials_heading_rest: "Say",
  testimonials_subtitle: "Fresh Styles Updated Weekly So Your Wardrobe Always Feels New.",

  // HowItWorks / Services
  services_label: "FEATURES",
  services_heading_highlight: "Our",
  services_heading_rest: "Services",
  services_subtitle: "Your favourite food partner",
  service_online_order: "Online Order",
  service_online_order_desc: "Browse our menu online and place your order in just a few taps, anytime and anywhere.",
  service_fast_delivery: "Fast delivery",
  service_fast_delivery_desc: "Your meal is prepared and delivered to your door as fast as possible, hot and fresh.",
  service_takeaway: "Takeaway",
  service_takeaway_desc: "Prefer to pick it up yourself? Order ahead and collect your meal ready at the counter.",

  // Features section
  features_heading: "Why People Choose us?",
  feature1_title: "Convenient and Reliable",
  feature1_desc: "Whether you dine in, take out, or order delivery, our service is convenient, fast, and reliable, making mealtime hassle-free.",
  feature2_title: "Variety of Options",
  feature2_desc: "From hearty meals to light snacks, we offer a wide range of options to suit every taste and craving.",
  feature3_title: "Eat Burger",
  feature3_desc: "Our burgers are grilled to perfection, with juicy patties and flavorful toppings that make every bite a delicious experience.",

  // About
  about_label: "About Us",
  about_heading: "About Us Foods For",
  about_heading_highlight: "Your Family",
  about_p1: "DashDine Restaurant is passionate about bringing fresh, delicious, and authentic meals right to your doorstep. We combine traditional Ethiopian flavors with modern culinary techniques to create a dining experience you'll never forget.",
  about_p2: "Our chefs carefully select ingredients to ensure every dish is bursting with flavor and freshness. Whether you crave classic favorites or innovative dishes, we promise quality and speed.",
  about_order_now: "Order now",
  about_natural: "Natural Taste",
  stat_experience: "Years of Experience",
  stat_deliveries: "Daily Deliveries",
  stat_customers: "Happy Customers",
  stat_dishes: "Specialty Dishes",
  value_fresh_title: "Fresh Ingredients",
  value_fresh_desc: "Sourced daily from local organic farms to ensure peak flavor.",
  value_fast_title: "Fast Delivery",
  value_fast_desc: "Our optimized logistics ensure your food arrives piping hot.",
  value_love_title: "Cooked with Love",
  value_love_desc: "Each recipe is a balance of tradition and culinary passion.",
  value_hygiene_title: "Highest Hygiene",
  value_hygiene_desc: "Strict safety protocols from the kitchen to your doorstep.",

  // Menu Page
  menu_heading: "Our",
  menu_heading_highlight: "Menu",
  menu_desc: "Freshly prepared meals delivered to your door. Filter by category to find your favorite dish.",
  menu_filter: "Filter",
  menu_search_placeholder: "Find a dish...",
  menu_showing_results: "Showing results for",
  menu_cat_all: "All",
  menu_cat_pizza: "Pizza",
  menu_cat_pasta: "Pasta",
  menu_cat_burgers: "Burgers",
  menu_cat_desserts: "Desserts",
  menu_cat_drinks: "Drinks",

  // Cart
  cart_back_home: "Back to home",
  cart_empty_title: "Your Cart is Empty",
  cart_empty_desc: "Looks like you haven't added anything yet",
  cart_go_to_menu: "Go To Menu",
  cart_heading: "Your Cart",
  cart_col_item: "Item",
  cart_col_name: "Name",
  cart_col_price: "Price",
  cart_col_quantity: "Quantity",
  cart_col_total: "Total",
  cart_col_actions: "Actions",
  cart_remove: "Remove",
  cart_totals: "Cart Totals",
  cart_subtotal: "Subtotal",
  cart_delivery_fee: "Delivery Fee",
  cart_total: "Total",
  cart_proceed_checkout: "Proceed To Checkout",
  cart_add_food_warning: "Add food to place an order!",

  // Checkout
  checkout_delivery_info: "Delivery Information",
  checkout_first_name: "First Name",
  checkout_last_name: "Last Name",
  checkout_email: "Email",
  checkout_street: "Street",
  checkout_city: "City",
  checkout_state: "State",
  checkout_zip: "Zip Code",
  checkout_country: "Country",
  checkout_phone: "Phone",
  checkout_cart_totals: "Cart Totals",
  checkout_subtotal: "Subtotal",
  checkout_delivery_fee: "Delivery Fee",
  checkout_total: "Total",
  checkout_proceed_payment: "Proceed To Payment",
  checkout_connecting: "Connecting to Stripe...",
  checkout_secured: "Secured by Stripe",

  // Login
  login_welcome: "Welcome",
  login_welcome_desc: "Discover delicious meals delivered to your door and enjoy exclusive dishes crafted just for you.",
  login_register_title: "Register",
  login_login_title: "Login",
  login_register_desc: "Create your account. It's free and only takes a minute.",
  login_login_desc: "Welcome back! Please enter your details.",
  login_full_name: "Full Name",
  login_email: "Email Address",
  login_password: "Password",
  login_register_btn: "Register Now",
  login_signin_btn: "Sign In",
  login_already_account: "Already have an account?",
  login_new_platform: "New to our platform?",
  login_login_here: "Login here",
  login_create_account: "Create account",

  // Contact
  contact_heading: "Get In",
  contact_heading_highlight: "Touch",
  contact_desc: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  contact_first_name: "First Name",
  contact_last_name: "Last Name",
  contact_email: "Email Address",
  contact_message: "How can we help?",
  contact_send: "Send Message",
  contact_sending: "Sending...",
  contact_visit: "Visit Us",
  contact_email_us: "Email Us",
  contact_call: "Call Us",
  contact_hours: "Hours",

  // Order Success
  order_success_title: "Payment Successful!",
  order_success_desc: "Your order has been placed successfully.",
  order_success_back: "Back to Home",

  // Profile
  profile_personal: "Personal",
  profile_orders: "Orders",
  profile_setting: "Setting",
  profile_logout: "Logout",
  profile_save_changes: "Save changes",
  profile_save_password: "Save Password",
  profile_current_password: "Current password",
  profile_new_password: "New password",
  profile_confirm_password: "Confirm new password",
  profile_field_fullname: "Full Name",
  profile_field_email: "Email",
  profile_field_phone: "Phone",
  profile_field_birthday: "Birthday",
  profile_field_gender: "Gender",
  profile_field_street: "Street",
  profile_field_zip: "Zip Code",
  profile_field_city: "City",
  profile_field_country: "Country",
  profile_gender_male: "Male",
  profile_gender_female: "Female",

  // Footer
  footer_company_desc: "Bringing the world's best flavors to your doorstep. Hot, fresh, and delivered with a smile. Your meal is just a dash away.",
  footer_service: "Service",
  footer_get_in_touch: "Get in Touch",
  footer_about: "About Us",
  footer_menu: "Our Menu",
  footer_track: "Track Order",
  footer_contact: "Contact Us",
  footer_newsletter_title: "Stay Hungry",
  footer_newsletter_desc: "Subscribe for exclusive discounts and new menu alerts.",
  footer_email_placeholder: "Your email",
  footer_invalid_email: "Please enter a valid email address",
  footer_subscribed: "Subscribed successfully 🎉",
  footer_copyright: "© 2024 Yegna byte. Built for the future of food.",
  footer_privacy: "Privacy",
  footer_terms: "Terms",
  footer_cookies: "Cookies",

  // Orders
  order_reference: "Order Reference",
  order_total_amount: "Total Amount",
  order_archive: "Archive",
  order_your_orders: "Your Orders",
  order_manage_desc: "Manage your current and past purchases",
  order_tab_active: "Active",
  order_tab_history: "History",
  order_none_found: "No orders found.",
  order_confirm_remove: "Are you sure you want to remove this record?",

  // Promotional Banners
  promo_banner1_tag: "Weekend Feast Savings",
  promo_banner1_title: "Flavorful Bundles at Amazing Prices",
  promo_banner1_cta: "Shop Fresh Deals",
  promo_banner2_tag: "Limited Time Event",
  promo_banner2_title: "Big Savings on Everyday Dinners",
  promo_banner2_cta: "Grab The Offer",

  // Food Modal
  modal_select_qty: "Select Quantity",
  modal_total_price: "Total Price",
  modal_add_to_cart: "Add to Cart",
};

// ── Amharic translations ──────────────────────────────────────────────────────
const am = {
  // Navbar
  nav_home: "መነሻ",
  nav_menu: "ምናሌያችን",
  nav_about: "ስለ እኛ",
  nav_get_started: "ጀምር",
  nav_language: "ቋንቋ",
  nav_currency: "ምንዛሬ",
  nav_profile: "መገለጫ",
  nav_admin_dashboard: "የአስተዳዳሪ ዳሽቦርድ",
  nav_logout: "ውጣ",

  // Header / Hero
  hero_title: "ምግባችንን ለ",
  hero_subtitle: "ቤተሰብዎ ያዘዙ",
  hero_description: "የወጥ ቤት ሥራን ይተዉ። ምርጥ ሸፎች ያዘጋጁትን ቤት ሰርቶ የሚቀርብ ልዩ ምግብ ወደ በሩ ይደርሳል።",
  hero_shop_now: "አሁን ያዝዙ",
  hero_free_delivery: "ነጻ ዲሊቨሪ",
  hero_sold: "ተሸጠ",

  // FeaturedCategories
  categories_heading: "ተለዋጭ",
  categories_heading_highlight: "ምድቦች",
  categories_subtitle: "የሚወዱት የምግብ አጋር",
  cat_breakfast: "ቁርስ",
  cat_lunch: "ምሳ",
  cat_dinner: "እራት",
  cat_desserts: "ጣፋጭ ምግቦች",
  cat_drinks: "መጠጦች",
  cat_snacks: "መክሰስ",
  cat_healthy: "ጤናማ",

  // PopularDishes
  popular_heading: "ታዋቂ",
  popular_heading_highlight: "ምግቦቻችን",
  popular_heading_rest: "",
  popular_subtitle: "የሚወዱት የምግብ አጋር",
  popular_browse_menu: "ሙሉ ምናሌን ይመልከቱ",
  popular_buy: "ግዙ",
  popular_fetching: "ምርጥ ምግቦቹን እየፈለጉ ነው...",

  // FooterBanner
  footer_banner_title: "ጋሪዎን ለመሙላት",
  footer_banner_title2: "ዝግጁ ናቸው?",
  footer_banner_freshness: "ትኩስ ምርቶች!",
  footer_banner_desc: "ትኩስ ምርቶች፣ የዕለት ቀን አስፈላጊ ነገሮች እና ልዩ ቅናሾችን — ወደ ደጅዎ ያቅርቡ።",
  footer_banner_cta: "የዛሬ ቅናሾችን ያግኙ",

  // Testimonials
  testimonials_heading: "ደንበኞቻችን",
  testimonials_heading_highlight: "ምን",
  testimonials_heading_rest: "ይላሉ",
  testimonials_subtitle: "ሳምንታዊ አዲስ ምርቶች እና ምናሌዎች ይገኛሉ።",

  // HowItWorks / Services
  services_label: "አገልግሎቶች",
  services_heading_highlight: "የእኛ",
  services_heading_rest: "አገልግሎቶች",
  services_subtitle: "የሚወዱት የምግብ አጋር",
  service_online_order: "ኦንላይን ማዘዝ",
  service_online_order_desc: "ምናሌን ኦንላይን ይመልከቱ እና ማንኛውም ጊዜ ቀላል ጠቅ ብቻ ይዘዙ።",
  service_fast_delivery: "ፈጣን ዲሊቨሪ",
  service_fast_delivery_desc: "ምግብዎ ተዘጋጅቶ በተቻለ ፍጥነት ትኩስ እና ሞቅ ብሎ ይደርሳል።",
  service_takeaway: "ወስደህ ውጣ",
  service_takeaway_desc: "እራስዎ ለማምጣት ይፈልጋሉ? ቀድሞ ያዝዙ እና ዝግጁ ሆነው ያግኙ።",

  // Features section
  features_heading: "ሰዎች ለምን እኛን ይመርጣሉ?",
  feature1_title: "ምቹ እና አስተማማኝ",
  feature1_desc: "ቤት ወስደው፣ ሲበሉ ወይም ዲሊቨሪ ሲጠቀሙ አገልግሎቱ ምቹ፣ ፈጣን እና አስተማማኝ ነው።",
  feature2_title: "ብዙ ዓይነት ምርጦች",
  feature2_desc: "ሙሉ ምግቦች ከቀላል መክሰስ ጀምሮ ለሁሉም ጣዕም እና ፍላጎት ተስማሚ ምርጦች አሉ።",
  feature3_title: "ቡርገር ይብሉ",
  feature3_desc: "ቡርገሮቻችን በጥሩ ሁኔታ የተጠበሱ ናቸው — ጣፋጭ ሥጋ እና ሙሉ ቶፒንጎች ያለው ጥሩ ልምድ።",

  // About
  about_label: "ስለ እኛ",
  about_heading: "ስለ እኛ ምግቦች ለ",
  about_heading_highlight: "ቤተሰብዎ",
  about_p1: "ዳሽዳይን ሬስቶራንት ትኩስ፣ ጣፋጭ እና ዋናውን ምግብ ወደ ደጅዎ ለማቅረብ ጥረታለሁ። ባህላዊ የኢትዮጵያ ምግቦችን ከዘመናዊ የምግብ ዝግጅት ጋር ጣምረን የማይረሳ ምግብ ልምድ ፈጥረናል።",
  about_p2: "ሸፎቻችን ምርጡን ጣዕምና ትኩስነት ለማረጋገጥ ቁሳቁሶቹን በጥንቃቄ ይመርጣሉ። ቀደምት ወይም አዲስ ምግቦች ቢፈልጉ፣ ጥራት እና ፍጥነት ቃል እንይዛለን።",
  about_order_now: "አሁን ያዝዙ",
  about_natural: "ተፈጥሯዊ ጣዕም",
  stat_experience: "ዓመት ልምድ",
  stat_deliveries: "ዕለታዊ ዲሊቨሪ",
  stat_customers: "ደስተኛ ደንበኞች",
  stat_dishes: "ልዩ ምግቦች",
  value_fresh_title: "ትኩስ ቁሳቁሶች",
  value_fresh_desc: "ምርጥ ጣዕምን ለማረጋገጥ ዕለታዊ ከአካባቢ ኦርጋኒክ እርሻዎች ይቀርባሉ።",
  value_fast_title: "ፈጣን ዲሊቨሪ",
  value_fast_desc: "ምግብዎ ሞቅ ብሎ እንዲደርስ የተሻለ ሎጅስቲክስ ዋስትና ይሰጣል።",
  value_love_title: "በፍቅር ተዘጋጀ",
  value_love_desc: "እያንዳንዱ ምግብ ወጎን እና ፍቅርን ያጣምራል።",
  value_hygiene_title: "ከፍተኛ ንጽህና",
  value_hygiene_desc: "ከወጥ ቤት ወደ ደጅዎ ድረስ ጥብቅ የደህንነት ፕሮቶኮሎች ይተገበራሉ።",

  // Menu Page
  menu_heading: "ምናሌ",
  menu_heading_highlight: "ዋናው",
  menu_desc: "ወደ በሩዎ የሚቀርቡ ትኩስ ምግቦች። ምዙን ምድብ ለማጣራት ይጠቀሙ።",
  menu_filter: "አጣርይ",
  menu_search_placeholder: "ምግብ ፈልጉ...",
  menu_showing_results: "ውጤቶች ይታያሉ ለ",
  menu_cat_all: "ሁሉም",
  menu_cat_pizza: "ፒዛ",
  menu_cat_pasta: "ፓስታ",
  menu_cat_burgers: "ቡርገሮች",
  menu_cat_desserts: "ጣፋጭ ምግቦች",
  menu_cat_drinks: "መጠጦች",

  // Cart
  cart_back_home: "ወደ መነሻ ተመለስ",
  cart_empty_title: "ጋሪዎ ባዶ ነው",
  cart_empty_desc: "ምንም ያልጨመሩ ይመስላል",
  cart_go_to_menu: "ወደ ምናሌ ሂድ",
  cart_heading: "ጋሪዎ",
  cart_col_item: "ምርት",
  cart_col_name: "ስም",
  cart_col_price: "ዋጋ",
  cart_col_quantity: "ብዛት",
  cart_col_total: "ጠቅላላ",
  cart_col_actions: "እርምጃዎች",
  cart_remove: "አስወግድ",
  cart_totals: "የጋሪ ጠቅላላ",
  cart_subtotal: "ንዑስ ድምር",
  cart_delivery_fee: "የዲሊቨሪ ክፍያ",
  cart_total: "ጠቅላላ",
  cart_proceed_checkout: "ወደ ክፍያ ቀጥል",
  cart_add_food_warning: "ለማዘዝ ምግብ ጨምሩ!",

  // Checkout
  checkout_delivery_info: "የዲሊቨሪ መረጃ",
  checkout_first_name: "ስም",
  checkout_last_name: "የአባት ስም",
  checkout_email: "ኢሜይል",
  checkout_street: "ጎዳና",
  checkout_city: "ከተማ",
  checkout_state: "ክልል",
  checkout_zip: "ፖስታ ቁጥር",
  checkout_country: "ሀገር",
  checkout_phone: "ስልክ",
  checkout_cart_totals: "የጋሪ ጠቅላላ",
  checkout_subtotal: "ንዑስ ድምር",
  checkout_delivery_fee: "የዲሊቨሪ ክፍያ",
  checkout_total: "ጠቅላላ",
  checkout_proceed_payment: "ወደ ክፍያ ቀጥል",
  checkout_connecting: "ወደ Stripe እየተገናኘ ነው...",
  checkout_secured: "በ Stripe የተጠበቀ",

  // Login
  login_welcome: "እንኳን ደህና መጡ",
  login_welcome_desc: "ወደ በሩዎ የሚቀርቡ ጣፋጭ ምግቦችን ያግኙ፣ ልዩ የሆኑ ምናሌዎችን ይደሰቱ።",
  login_register_title: "መዝገብ",
  login_login_title: "ግባ",
  login_register_desc: "መለያዎን ይፍጠሩ። ነጻ ሲሆን ደቂቃ ብቻ ይወስዳል።",
  login_login_desc: "እንደገና እንኳን ደህና መጡ! ዝርዝሮቹን ያስገቡ።",
  login_full_name: "ሙሉ ስም",
  login_email: "የኢሜይል አድራሻ",
  login_password: "Password",
  login_register_btn: "አሁን ይመዝገቡ",
  login_signin_btn: "ግባ",
  login_already_account: "አስቀድሞ መለያ አለዎት?",
  login_new_platform: "አዲስ ተጠቃሚ ናቸው?",
  login_login_here: "እዚህ ይግቡ",
  login_create_account: "መለያ ይፍጠሩ",

  // Contact
  contact_heading: "ያናግሩን",
  contact_heading_highlight: "",
  contact_desc: "ጥያቄ አለዎት? ለመስማት ደስ ይለናል። መልዕክት ይላኩ፣ ቶሎ ምላሽ እናቀርባለን።",
  contact_first_name: "ስም",
  contact_last_name: "የአባት ስም",
  contact_email: "የኢሜይል አድራሻ",
  contact_message: "እንዴት ልንረዳዎ እንችላለን?",
  contact_send: "መልዕክት ላክ",
  contact_sending: "እየተላከ ነው...",
  contact_visit: "ይጎብኙን",
  contact_email_us: "ኢሜይል ያድርጉ",
  contact_call: "ይደውሉ",
  contact_hours: "ሰዓታት",

  // Order Success
  order_success_title: "ክፍያ ተሳክቷል!",
  order_success_desc: "ትዕዛዝዎ በተሳካ ሁኔታ ተቀብሏል።",
  order_success_back: "ወደ መነሻ ተመለስ",

  // Profile
  profile_personal: "ግላዊ መረጃ",
  profile_orders: "ትዕዛዞች",
  profile_setting: "ቅንብሮች",
  profile_logout: "ውጣ",
  profile_save_changes: "ለውጦችን አስቀምጥ",
  profile_save_password: "ምስጢር ቁጥር አስቀምጥ",
  profile_current_password: "ያሁኑ ምስጢር ቁጥር",
  profile_new_password: "አዲስ ምስጢር ቁጥር",
  profile_confirm_password: "ምስጢር ቁጥር አረጋግጥ",
  profile_field_fullname: "ሙሉ ስም",
  profile_field_email: "ኢሜይል",
  profile_field_phone: "ስልክ",
  profile_field_birthday: "የልደት ቀን",
  profile_field_gender: "ፆታ",
  profile_field_street: "ጎዳና",
  profile_field_zip: "ፖስታ ቁጥር",
  profile_field_city: "ከተማ",
  profile_field_country: "ሀገር",
  profile_gender_male: "ወንድ",
  profile_gender_female: "ሴት",

  // Footer
  footer_company_desc: "የዓለምን ምርጥ ጣዕሞች ወደ ደጅዎ እናቀርባለን። ሞቅ ብሎ፣ ትኩስ ሆኖ፣ ፈገግ ብሎ ይቀርባል።",
  footer_service: "አገልግሎት",
  footer_get_in_touch: "ያናግሩን",
  footer_about: "ስለ እኛ",
  footer_menu: "ምናሌያችን",
  footer_track: "ትዕዛዝ ክትትል",
  footer_contact: "አግኙን",
  footer_newsletter_title: "ሁልጊዜ ትኩስ ሁኑ",
  footer_newsletter_desc: "ልዩ ቅናሾችና አዲስ ምናሌ ማሳወቂያ ለማግኘት ይመዝገቡ።",
  footer_email_placeholder: "ኢሜይልዎ",
  footer_invalid_email: "ትክክለኛ የኢሜይል አድራሻ ያስገቡ",
  footer_subscribed: "በተሳካ ሁኔታ ተመዝግበዋል 🎉",
  footer_copyright: "© 2024 Yegna byte. ለምግብ ዘመናዊ ወደፊት ተሰርቷል።",
  footer_privacy: "ግላዊነት",
  footer_terms: "ውሎች",
  footer_cookies: "ኩኪዎች",

  // Orders
  order_reference: "የትዕዛዝ ቁጥር",
  order_total_amount: "ጠቅላላ መጠን",
  order_archive: "ማህደር",
  order_your_orders: "ትዕዛዞችዎ",
  order_manage_desc: "ወቅታዊ እና ያለፉ ትዕዛዞችዎን ያስተዳድሩ",
  order_tab_active: "ንቁ",
  order_tab_history: "ታሪክ",
  order_none_found: "ምንም ትዕዛዞች አልተገኙም።",
  order_confirm_remove: "ይህን መዝገብ ማስወገድ እርግጠኛ ናቸው?",

  // Promotional Banners
  promo_banner1_tag: "የሳምንት ፍሬ ቅናሾች",
  promo_banner1_title: "በዕጅጉ ዋጋ ቅናሽ ያለው የምግብ ጥቅል",
  promo_banner1_cta: "ትኩስ ቅናሾችን ግዙ",
  promo_banner2_tag: "ለጊዜ ውሱን ዝግጅት",
  promo_banner2_title: "ለዕለት ምሳ ትልቅ ቅናሽ",
  promo_banner2_cta: "ቅናሹን ያዙ",

  // Food Modal
  modal_select_qty: "መጠን ይምረጡ",
  modal_total_price: "ጠቅላላ ዋጋ",
  modal_add_to_cart: "ወደ ጋሪ ጨምር",
};

const translations = { EN: en, AM: am };

// ── Provider ──────────────────────────────────────────────────────────────────
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem('lang') || 'EN'
  );

  const switchLanguage = (code) => {
    setLanguage(code);
    localStorage.setItem('lang', code);
  };

  const t = (key) => translations[language]?.[key] ?? translations['EN'][key] ?? key;

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ── Convenience hook ──────────────────────────────────────────────────────────
export const useTranslation = () => useContext(LanguageContext);

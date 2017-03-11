function MealMaker() {
   this.getPasta = function(pastaType) {
           if (pastaType === "Rigati") {
          return "Sedanini Rigati with Steak";
       } else if (pastaType === "Spirale") {
           return "Fusilli Spirale with Meatballs";
       } else if (pastaType === "Ziti") {
          return "Penne Mezzi Ziti Corte with Tofu";
       } else if (pastaType === "Bucati") {
           return "Fusilli Bucati Corti with Mushrooms";
       } else {
           return "";
       }
   };
}
function MealMakerProxy() {
   var currentMeal = new MealMaker();
   var buffetCache = {};
   return {
       getDish: function(pastaType) {
          if (!buffetCache[pastaType]) {
               buffetCache[pastaType] = currentMeal.getPasta(pastaType);
           }
           log.add(pastaType + ": " + buffetCache[pastaType]);
           return buffetCache[pastaType];
       },
       getCount: function() {
           var dishes = 0;
           for (var dish in buffetCache) { dishes++; }
          return dishes;
       }
  };
};
// log helper
var log = (function() {
   var log = "";
   return {
       add: function(msg) { log += msg + "\n"; },
       show: function() { alert(log); log = ""; }
   }
})();

function run() {
   var suchef = new MealMakerProxy();
   suchef.getDish("Ziti");
   suchef.getDish("Rigati");
   suchef.getDish("Spirale");
   suchef.getDish("Rigati");
   suchef.getDish("Bucati");
   suchef.getDish("Bucati");
   suchef.getDish("Bucati");
   log.add("\nCache size: " + suchef.getCount());
   log.show();
}
run();

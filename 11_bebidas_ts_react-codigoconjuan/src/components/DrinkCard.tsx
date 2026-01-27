import { Drink } from "../utils/recipe-schema";

type DrinkCardProps = {
    drink: Drink;
    onViewRecipe: (drinkId: string) => void;
    onToggleFavorite: (drink: Drink) => void;
    isFavorite: boolean;
    colorVariant?: "orange" | "purple" | "blue" | "green" | "pink";
};

export default function DrinkCard({ drink, onViewRecipe, onToggleFavorite, isFavorite, colorVariant = "orange" }: DrinkCardProps) {
    // Color variants for different cards
    const colorClasses = {
        orange: {
            border: "hover:border-orange-500/50 hover:shadow-orange-500/20",
            gradient: "group-hover:from-orange-400 group-hover:to-orange-600",
            button: "from-orange-500/10 to-orange-600/10 hover:from-orange-500 hover:to-orange-600 border-orange-500/30 hover:border-orange-500 text-orange-400",
            badge: "bg-orange-500/20 border-orange-500/50 text-orange-400",
        },
        purple: {
            border: "hover:border-purple-500/50 hover:shadow-purple-500/20",
            gradient: "group-hover:from-purple-400 group-hover:to-purple-600",
            button: "from-purple-500/10 to-purple-600/10 hover:from-purple-500 hover:to-purple-600 border-purple-500/30 hover:border-purple-500 text-purple-400",
            badge: "bg-purple-500/20 border-purple-500/50 text-purple-400",
        },
        blue: {
            border: "hover:border-blue-500/50 hover:shadow-blue-500/20",
            gradient: "group-hover:from-blue-400 group-hover:to-blue-600",
            button: "from-blue-500/10 to-blue-600/10 hover:from-blue-500 hover:to-blue-600 border-blue-500/30 hover:border-blue-500 text-blue-400",
            badge: "bg-blue-500/20 border-blue-500/50 text-blue-400",
        },
        green: {
            border: "hover:border-green-500/50 hover:shadow-green-500/20",
            gradient: "group-hover:from-green-400 group-hover:to-green-600",
            button: "from-green-500/10 to-green-600/10 hover:from-green-500 hover:to-green-600 border-green-500/30 hover:border-green-500 text-green-400",
            badge: "bg-green-500/20 border-green-500/50 text-green-400",
        },
        pink: {
            border: "hover:border-pink-500/50 hover:shadow-pink-500/20",
            gradient: "group-hover:from-pink-400 group-hover:to-pink-600",
            button: "from-pink-500/10 to-pink-600/10 hover:from-pink-500 hover:to-pink-600 border-pink-500/30 hover:border-pink-500 text-pink-400",
            badge: "bg-pink-500/20 border-pink-500/50 text-pink-400",
        },
    };

    const colors = colorClasses[colorVariant];

    return (
        <div className={`group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700/50 ${colors.border} transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2`}>
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden bg-slate-950/50">
                <img
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                {/* Favorite Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(drink);
                    }}
                    className={`absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 backdrop-blur-sm border transition-all duration-200 opacity-0 group-hover:opacity-100 ${isFavorite
                            ? 'border-red-500 bg-red-500/20'
                            : 'border-slate-700/50 hover:border-red-500 hover:bg-red-500/20'
                        }`}
                >
                    <svg
                        className={`w-5 h-5 transition-colors ${isFavorite ? 'text-red-500' : 'text-slate-300 hover:text-red-500'}`}
                        fill={isFavorite ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className={`text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${colors.gradient} transition-all duration-300`}>
                    {drink.strDrink}
                </h3>

                {/* Action Button - Standardized Orange */}
                <button
                    onClick={() => onViewRecipe(drink.idDrink)}
                    className="w-full bg-gradient-to-r from-orange-500/10 to-orange-600/10 hover:from-orange-500 hover:to-orange-600 border-orange-500/30 hover:border-orange-500 text-orange-400 hover:text-white font-semibold py-3 px-4 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                >
                    <span>Ver Receta</span>
                    <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] pointer-events-none" />
        </div>
    );
}

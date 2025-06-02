<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Define your route model bindings, pattern filters, etc.
     */
    public function boot(): void
    {
        $this->routes(function () {
            // Load API routes with 'api' prefix and 'api' middleware
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            // Load Web routes with 'web' middleware
            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }
}

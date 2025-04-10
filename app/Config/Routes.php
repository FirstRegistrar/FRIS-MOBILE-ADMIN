<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// Default Route 
$routes->get('/', 'AuthController::login');

// Auth Routes
$routes->get('/login', 'AuthController::login');
$routes->post('/authenticate', 'AuthController::authenticate');
$routes->get('/logout', 'AuthController::logout');

$routes->get('/dashboard', 'DashboardController::index', ['filter' => 'authGuard']);

// Permissions (Super Admin only)
$routes->group('', ['filter' => 'authGuard:1'], function($routes) {
    $routes->get('/permissions', 'PermissionsController::index');
    $routes->get('/permissions/create', 'PermissionsController::create');
    $routes->post('/permissions/store', 'PermissionsController::store');
    $routes->get('/permissions/edit/(:num)', 'PermissionsController::edit/$1');
    $routes->post('/permissions/update/(:num)', 'PermissionsController::update/$1');
    $routes->get('/permissions/delete/(:num)', 'PermissionsController::delete/$1');
});

// Roles (Super Admin only)
$routes->group('', ['filter' => 'authGuard:1'], function($routes) {
    $routes->get('/roles', 'RolesController::index');
    $routes->get('/roles/create', 'RolesController::create');
    $routes->post('/roles/store', 'RolesController::store');
    $routes->get('/roles/edit/(:num)', 'RolesController::edit/$1');
    $routes->post('/roles/update/(:num)', 'RolesController::update/$1');
    $routes->get('/roles/delete/(:num)', 'RolesController::delete/$1');
});

// Users (Super Admin and Admin)
$routes->group('', ['filter' => 'authGuard:1,2'], function($routes) {
    $routes->get('/users', 'UsersController::index');
    $routes->get('/users/create', 'UsersController::create');
    $routes->post('/users/store', 'UsersController::store');
    $routes->get('/users/edit/(:num)', 'UsersController::edit/$1');
    $routes->post('/users/update/(:num)', 'UsersController::update/$1');
    $routes->get('/users/delete/(:num)', 'UsersController::delete/$1');
});

// Users (Super Admin and Admin)
$routes->group('', ['filter' => 'authGuard:1,2'], function($routes) {
    $routes->get('/shareholders', 'ShareholdersController::index');
    $routes->get('shareholders/data', 'ShareholdersController::getData');
    $routes->get('/profile/edit', 'ProfileController::edit');
    $routes->post('/profile/update', 'ProfileController::update');
    $routes->get('/settings', 'SettingsController::index');
    $routes->get('/reports', 'ReportsController::index');
    $routes->get('/reports/login', 'ReportsController::login');
    $routes->get('/reports/user', 'ReportsController::users');
    $routes->post('/settings/update', 'SettingsController::update');
    $routes->get('/viewActivity', 'ViewActivityController::index');
});

// Unauthorized Access
$routes->get('/unauthorized', 'ErrorController::unauthorized');


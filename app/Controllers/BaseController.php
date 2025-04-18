<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\CLIRequest;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;

/**
 * Class BaseController
 *
 * BaseController provides a convenient place for loading components
 * and performing functions that are needed by all your controllers.
 * Extend this class in any new controllers:
 *     class Home extends BaseController
 *
 * For security be sure to declare any new methods as protected or private.
 */
abstract class BaseController extends Controller
{
    /**
     * Instance of the main Request object.
     *
     * @var CLIRequest|IncomingRequest
     */
    protected $request;

    /**
     * An array of helpers to be loaded automatically upon
     * class instantiation. These helpers will be available
     * to all other controllers that extend BaseController.
     *
     * @var list<string>
     */
    protected $helpers = [];

    /**
     * Be sure to declare properties for any property fetch you initialized.
     * The creation of dynamic property is deprecated in PHP 8.2.
     */
    // protected $session;

    /**
     * @return void
     */
    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger)
    {
        parent::initController($request, $response, $logger);

        // Check if user is logged in
        $session = session();
        if (!$session->get('isLoggedIn')) {
            return redirect()->to('/login');
        }

        // Get current route
        $router = service('router');
        $controller = $router->controllerName();
        $method = $router->methodName();
        $route = "{$controller}::{$method}";

        // Skip permission check for auth and error controllers
        if (in_array($controller, ['App\Controllers\AuthController', 'App\Controllers\ErrorController'])) {
            return;
        }

        // Get user's role and permissions
        $roleId = $session->get('role_id');
        $permissionsModel = new \App\Models\PermissionsModel();
        $userPermissions = $permissionsModel->getPermissionsByRole($roleId);

        // Check if user has permission
        if (!in_array($route, $userPermissions)) {
            return redirect()->to('/unauthorized');
        }
    }
}

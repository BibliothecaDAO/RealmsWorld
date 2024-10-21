"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotFoundError;
var react_router_dom_1 = require("react-router-dom");
var ui_1 = require("@realms-world/ui");
function NotFoundError() {
    var navigate = (0, react_router_dom_1.useNavigate)();
    return (<div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] font-bold leading-tight'>404</h1>
        <span className='font-medium'>Oops! Page Not Found!</span>
        <p className='text-center text-muted-foreground'>
          It seems like the page you're looking for <br />
          does not exist or might have been removed.
        </p>
        <div className='mt-6 flex gap-4'>
          <ui_1.Button variant='outline' onClick={function () { return navigate(-1); }}>
            Go Back
          </ui_1.Button>
          <ui_1.Button onClick={function () { return navigate('/'); }}>Back to Home</ui_1.Button>
        </div>
      </div>
    </div>);
}

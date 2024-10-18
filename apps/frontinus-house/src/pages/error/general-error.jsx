"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GeneralError;
var react_router_dom_1 = require("react-router-dom");
var ui_1 = require("@realms-world/ui");
var utils_1 = require("@realms-world/utils");
function GeneralError(_a) {
    var className = _a.className, _b = _a.minimal, minimal = _b === void 0 ? false : _b;
    var navigate = (0, react_router_dom_1.useNavigate)();
    return (<div className={(0, utils_1.cn)('h-svh w-full', className)}>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        {!minimal && (<h1 className='text-[7rem] font-bold leading-tight'>500</h1>)}
        <span className='font-medium'>Oops! Something went wrong {":')"}</span>
        <p className='text-center text-muted-foreground'>
          We apologize for the inconvenience. <br /> Please try again later.
        </p>
        {!minimal && (<div className='mt-6 flex gap-4'>
            <ui_1.Button variant='outline' onClick={function () { return navigate(-1); }}>
              Go Back
            </ui_1.Button>
            <ui_1.Button onClick={function () { return navigate('/'); }}>Back to Home</ui_1.Button>
          </div>)}
      </div>
    </div>);
}

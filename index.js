"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.configMsg = void 0;
// import * as github from '@actions/github'
const core = __importStar(require("@actions/core"));
const App_types_1 = require("./src/App.types");
const App_1 = __importDefault(require("./src/App"));
exports.configMsg = '. Configure Github secrets please';
const run = () => {
    try {
        const errors = [];
        const { nowUsername = '', nowPassword = '', nowInstallInstance = '' } = process.env;
        if (!nowUsername) {
            errors.push(App_types_1.Errors.USERNAME);
        }
        if (!nowPassword) {
            errors.push(App_types_1.Errors.PASSWORD);
        }
        if (!nowInstallInstance) {
            errors.push(App_types_1.Errors.INSTALL_INSTANCE);
        }
        if (errors.length) {
            core.setFailed(`${errors.join('. ')}${exports.configMsg}`);
        }
        else {
            const props = {
                nowInstallInstance,
                username: nowUsername,
                password: nowPassword,
            };
            const app = new App_1.default(props);
            app.runTests().catch(error => {
                core.setFailed(error.message);
            });
        }
    }
    catch (error) {
        core.setFailed(error.message);
    }
};
exports.run = run;
(0, exports.run)();

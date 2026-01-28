"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUstadDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_ustad_dto_1 = require("./create-ustad.dto");
class UpdateUstadDto extends (0, mapped_types_1.PartialType)(create_ustad_dto_1.CreateUstadDto) {
}
exports.UpdateUstadDto = UpdateUstadDto;
//# sourceMappingURL=update-ustad.dto.js.map
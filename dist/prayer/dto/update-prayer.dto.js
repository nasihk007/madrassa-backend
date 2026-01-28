"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePrayerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_prayer_dto_1 = require("./create-prayer.dto");
class UpdatePrayerDto extends (0, mapped_types_1.PartialType)(create_prayer_dto_1.CreatePrayerDto) {
}
exports.UpdatePrayerDto = UpdatePrayerDto;
//# sourceMappingURL=update-prayer.dto.js.map
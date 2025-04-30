import {District} from "@/api/schema/user";

export function districtLabel(district?: District): string {
    if (!district) return '-';
    return district === District.그외 ? '그 외' : district;
}
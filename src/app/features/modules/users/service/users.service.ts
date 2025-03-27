import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { FilterUserPaginatedDto } from '../dto/filter-user-paginated.dto';
import { CreateUpdateUserDto } from '../dto/create-update-user.dto';
import { ListPaginated } from '../../../../shared/models/list-paginated.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private readonly http: HttpClient) {}

  getUsersById(id: string): Observable<User> {
    return this.http.get<User>(`/users/${id}`);
  }

  getUsers(dto?: FilterUserPaginatedDto): Observable<ListPaginated<User>> {
    let params = new HttpParams();

    if (dto) {
      if (dto.search) params = params.set('search', dto.search);
      if (dto.profileId) params = params.set('profileId', dto.profileId);
      if (dto.page) params = params.set('page', dto.page.toString());
      if (dto.limit) params = params.set('limit', dto.limit.toString());
    }

    return this.http.get<ListPaginated<User>>('/users', { params });
  }

  createUser(user: CreateUpdateUserDto): Observable<User> {
    return this.http.post<User>('/users', user);
  }

  updateUser(id: string, user: CreateUpdateUserDto): Observable<User> {
    return this.http.put<User>(`/users/${id}`, user);
  }

  toggleUserStatus(userId: string, isActive: boolean): Observable<User> {
    return this.http.patch<User>(`/users/${userId}/active`, { isActive });
  }

  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(`/users/${userId}`);
  }
}

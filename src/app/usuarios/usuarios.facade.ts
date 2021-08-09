import { Injectable } from '@angular/core';

import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

import { BehaviorSubject, combineLatest, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import sortBy from 'lodash-es/sortBy';
import groupBy from 'lodash-es/groupBy';

import { User } from '@papx/models';
import { AuthService } from '@papx/auth';

@Injectable({ providedIn: 'root' })
export class UsuariosFacade {
  usuarios$ = this.afs
    .collection<User>('usuarios')
    .valueChanges({ idField: 'uid' })
    .pipe();

  searchTerm$ = new BehaviorSubject<string>('');

  usuariosFiltrados$ = combineLatest([this.usuarios$, this.searchTerm$]).pipe(
    map(([usuarios, term]) =>
      usuarios.filter((item) =>
        item.displayName.toLowerCase().includes(term.toLowerCase())
      )
    )
  );

  usuariosPorSucursal$ = this.usuariosFiltrados$.pipe(
    map((users) => groupBy(users, 'sucursal')),
    map((grupo) => {
      const keys = Object.keys(grupo);
      const orderedGroup: { [key: string]: any } = {};
      keys.forEach((key) => (orderedGroup[key] = sortBy(grupo[key], 'nombre')));
      return orderedGroup;
    })
  );

  constructor(
    private afs: AngularFirestore,
    private aff: AngularFireFunctions,
    private auth: AuthService
  ) {}

  setSearchTerm(term: string) {
    this.searchTerm$.next(term);
  }

  getCurrentUser(uid: string): Observable<User> {
    return this.usuarios$.pipe(
      map((usuarios) => usuarios.find((item) => item.uid === uid))
    );
  }
  getUser(uid: string) {
    return this.afs
      .doc<User>(`usuarios/${uid}`)
      .valueChanges({ idField: 'uid' });
  }

  getCredentials(uid: string) {
    const callable = this.aff.httpsCallable('fetchUserInfo');
    return callable({ uid }).pipe(catchError((err) => throwError(err)));
  }

  updateUser(user: User, changes: Partial<User>, adminUser: User) {
    if (!user.uid) {
      throw new Error(
        'User uid is undefined for user instance: ' + user.displayName
      );
    }
    const payload = {
      ...changes,
      updateUser: adminUser.displayName,
      updateUserUid: adminUser.uid,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
    };
    return this.afs.doc(`usuarios/${user.uid}`).set(payload, { merge: true });
  }

  updateUserRoles(uid: string, roles: any) {
    const callable = this.aff.httpsCallable('updateUserRoles');
    return callable({ uid, roles }).pipe(catchError((err) => throwError(err)));
  }

  updateUserPassword(uid: string, password: any) {
    const callable = this.aff.httpsCallable('updateUserPassword');
    return callable({ uid, password }).pipe(
      catchError((err) => throwError(err))
    );
  }

  updateUserProfile(uid: string, changes: Partial<User>) {
    const callable = this.aff.httpsCallable('updateUserProfile');
    return callable({ uid, changes }).pipe(
      catchError((err) => throwError(err))
    );
  }
}

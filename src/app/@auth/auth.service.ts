import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';

import { throwError, of, Observable } from 'rxjs';
import {
  catchError,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import { User, UserInfo } from '../@models/user';
import { mapUser } from './utils';
import { AngularFirestore } from '@angular/fire/firestore';

import firebase from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly user$ = this.auth.authState.pipe(
    map((user) => (user ? mapUser(user) : null))
  );

  readonly claims$ = this.auth.idTokenResult.pipe(
    map((res) => (res ? res.claims : {}))
  );

  readonly userInfo$: Observable<UserInfo | null> = this.user$.pipe(
    switchMap((user) => (user ? this.getUser(user.uid) : of(null))),
    shareReplay(1),
    catchError((err) => throwError(err))
  );

  constructor(
    public readonly auth: AngularFireAuth,
    private readonly fns: AngularFireFunctions,
    private readonly firestore: AngularFirestore
  ) {}

  async singOut() {
    await this.auth.signOut();
  }

  async signInAnonymously() {
    const { user } = await this.auth.signInAnonymously();
    return mapUser(user);
  }

  async signIn(email: string, password: string) {
    try {
      const { user } = await this.auth.signInWithEmailAndPassword(
        email,
        password
      );
      return user;
    } catch (error) {
      let message = null;
      switch (error.code) {
        case 'auth/user-not-found':
          message = 'Usuario no registrado';
          break;
        case 'auth/wrong-password':
          message = 'Nombre de corrreo ó contraseña incorrectas';
          break;
        default:
          message = error.message;
          break;
      }
      throw new Error(message);
    }
  }

  sendEmailVerification(user: User) {
    return user.firebaseUser.sendEmailVerification({
      url: location.origin,
      handleCodeInApp: false,
    });
  }

  hasRole(user: firebase.User) {}

  createUser(payload: Partial<User>) {
    const callable = this.fns.httpsCallable('createUser');
    return callable(payload).pipe(catchError((err) => throwError(err)));
  }

  getUser(uid: string) {
    return this.firestore.doc<UserInfo>(`users/${uid}`).valueChanges();
  }

  getUserByEmail(email: string): Observable<UserInfo | null> {
    return this.firestore
      .collection<UserInfo>('usuarios', (ref) =>
        ref.where('email', '==', email).limit(1)
      )
      .valueChanges()
      .pipe(
        map((users) => (users.length > 0 ? users[0] : null)),
        catchError((err) => throwError(err))
      );
  }

  async updateSucursal(user: UserInfo, sucursal: string) {
    await this.firestore
      .collection('usuarios')
      .doc(user.uid)
      .update({ sucursal });
  }
}

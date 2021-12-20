import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {Post} from "../app/models/post.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(
      `https://ngrx-course-ee6ba-default-rtdb.firebaseio.com//posts.json`
    ).pipe(
      map((data) => {
        const posts: Post[] = [];
        for (let key in data) {
          posts.push({...data[key], id: key});
        }
        return posts;
      })
    )
  }

  addPost(post: Post): Observable<{name: string}> {
    return this.http.post<{name: string}>(`https://ngrx-course-ee6ba-default-rtdb.firebaseio.com//posts.json`, post);
  }


  updatePost(post: Post) {
    const postData = {
      [post.id]: {title: post.title, description: post.description}
    };
    return this.http.patch(`https://ngrx-course-ee6ba-default-rtdb.firebaseio.com//posts.json`, postData)
  }

  deletePost(id: string) {
    return this.http.delete(`https://ngrx-course-ee6ba-default-rtdb.firebaseio.com//posts.json?id=${id}`);
  }
}

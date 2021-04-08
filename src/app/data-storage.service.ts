import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, tap } from 'rxjs/operators'
import { LocationsService } from './locations.service'
import { Loc } from './locations.model'

@Injectable({providedIn: 'root'})
export class DataStorageService {

	constructor(private http: HttpClient, private locationsService: LocationsService) {}

	saveData() {
		const locations = this.locationsService.getLocations();
		this.http.put('https://pickmeup-307305-default-rtdb.firebaseio.com/locations.json',
			locations
			).subscribe((response)=>{
				console.log(response)
			})
	}

	fetchData() {
		return this.http.get<Loc[]>('https://pickmeup-307305-default-rtdb.firebaseio.com/locations.json')
		.pipe(
			map(locations => {
				return locations.map(recipe=> {
					return {} // {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
				});
			}
		),
			tap((locations: Loc[]) => {
				this.locationsService.setLocations(locations)
			})
		)
	}

	// fetchData() {
	// 	return this.authService.user.pipe(
	// 	take(1), 
	// 	exhaustMap(user=> {
	// 		return this.http.get<Recipe[]>('https://angulartraining-72ce0.firebaseio.com/recipes.json',
	// 		{
	// 			params: new HttpParams().set('auth', user.token)
	// 		})
	// 	}),
	// 	map(recipes => {
	// 		return recipes.map(recipe=> {
	// 			return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
	// 		});
	// 	}),
	// 	tap((recipes) => {
	// 		this.recipeService.setRecipes(recipes)
	// 	})
	// 	)	
	// }

}
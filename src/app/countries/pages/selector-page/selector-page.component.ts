import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Region, SmallCountry } from '../../interfaces/Country';
import { switchMap, tap } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: ``
})
export class SelectorPageComponent implements OnInit {

  public countriesByRegion: SmallCountry[] = [];
  public borders: string[] = [];

  public myForm: FormGroup = this.fb.group({
    region:['',Validators.required],
    country:['',Validators.required],
    border:['',Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private countriesService: CountryService
  ){}

  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }


  get regions(): Region[]{
    return this.countriesService.regions;
  }

  onRegionChanged():void{
    this.myForm.controls['region'].valueChanges.pipe(
      tap(() => this.myForm.get('country')!.setValue('')),
      switchMap(region => this.countriesService.getCountriesByRegion(region))
    ).subscribe(countries=>{
      this.countriesByRegion = countries;
    })
  }

    onCountryChanged():void {
    this.myForm.controls['country'].valueChanges.pipe(
      tap(() => this.myForm.get('border')!.setValue(''))
    ).subscribe(
      borders => {
        console.log({borders});
      }
    )
  }

}
